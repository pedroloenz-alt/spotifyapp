document.addEventListener('DOMContentLoaded', function() {
    const withdrawForm = document.getElementById('withdrawForm');
    const paypalEmail = document.getElementById('paypalEmail');
    const withdrawAmount = document.getElementById('withdrawAmount');
    const submitBtn = document.getElementById('submitBtn');
    const balanceElement = document.getElementById('balance');
    const availableBalanceElement = document.getElementById('availableBalance');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupMessage = document.getElementById('popupMessage');
    const popupClose = document.getElementById('popupClose');
    const popupTitle = document.querySelector('.popup-title');
    const popupIcon = document.querySelector('.popup-icon');
    const popupSubmessage = document.querySelector('.popup-submessage');

    let currentUser = null;
    let userData = null;

    function loadUserData() {
        currentUser = localStorage.getItem('currentUser');
        if (!currentUser) { window.location.href = 'index.html'; return false; }
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[currentUser]) {
            users[currentUser] = {
                balance: 278.77,
                evaluatedSongs: [],
                dailyEvaluations: {},
                totalEvaluations: 0,
                registrationDate: new Date().toISOString()
            };
            localStorage.setItem('users', JSON.stringify(users));
        }
        userData = users[currentUser];
        return true;
    }

    function saveUserData() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[currentUser] = userData;
        localStorage.setItem('users', JSON.stringify(users));
    }

    function updateBalance() {
        const formattedBalance = userData.balance.toFixed(2);
        if (balanceElement) balanceElement.textContent = formattedBalance;
        if (availableBalanceElement) availableBalanceElement.textContent = formattedBalance;
    }

    if (!loadUserData()) return;
    updateBalance();
    if (window.addNavBadge) window.addNavBadge();

    withdrawAmount.addEventListener('input', function() {
        let value = this.value;
        if (value && !isNaN(value)) {
            const numValue = parseFloat(value);
            if (numValue > userData.balance) {
                this.setCustomValidity('Saldo insuficiente');
            } else if (numValue < 6000) {
                this.setCustomValidity('El monto mínimo es de $6,000.00');
            } else {
                this.setCustomValidity('');
            }
        }
    });

    withdrawForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = paypalEmail.value.trim();
        const amount = parseFloat(withdrawAmount.value);
        if (!email || !amount) { showErrorPopup('Por favor, completá todos los campos'); return; }
        const blocked = amount < 6000 || userData.balance < 6000;
        if (amount > userData.balance) { showErrorPopup('Saldo insuficiente'); return; }
        if (blocked) { showHighDemandPopup(); return; }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Procesando...';
        setTimeout(() => {
            userData.balance -= amount;
            saveUserData();
            updateBalance();
            withdrawForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Solicitar Retiro';
            showSuccessPopup(amount);
        }, 1500);
    });

    function showSuccessPopup(amount) {
        popupTitle.textContent = '¡Retiro solicitado con éxito!';
        popupIcon.textContent = '✅';
        popupMessage.textContent = `El retiro de $${amount.toFixed(2)} ha sido solicitado con éxito.`;
        popupSubmessage.style.display = 'block';
        popupOverlay.classList.add('show');
    }

    function showHighDemandPopup() {
        // Remove any existing high demand popup
        const existing = document.getElementById('highDemandPopup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.id = 'highDemandPopup';
        popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
        popup.innerHTML = `
            <div style="background:#1a1a2e;border-radius:20px;padding:32px 24px;max-width:380px;width:100%;text-align:center;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 60px rgba(0,0,0,0.5);">
                <div style="font-size:3rem;margin-bottom:12px;">⚠️</div>
                <h2 style="color:#fff;font-size:1.3rem;font-weight:800;margin-bottom:10px;">Saque temporariamente limitado</h2>
                <p style="color:rgba(255,255,255,0.75);font-size:0.92rem;line-height:1.6;margin-bottom:18px;">
                    Devido à <strong style="color:#1DB954;">alta demanda de saques</strong> na plataforma, o valor mínimo para retirada foi ajustado temporariamente para <strong style="color:#fff;">$6.000,00</strong>.
                </p>
                <div style="background:rgba(29,185,84,0.1);border:1px solid rgba(29,185,84,0.3);border-radius:12px;padding:14px;margin-bottom:20px;">
                    <p style="color:#1DB954;font-size:0.85rem;margin:0;">📢 Esta medida protege os usuários e garante a segurança dos pagamentos. Continue avaliando músicas para atingir o limite!</p>
                </div>
                <button id="closeHighDemandBtn" style="background:linear-gradient(135deg,#1DB954,#17a047);color:#fff;border:none;border-radius:50px;padding:14px 32px;font-size:1rem;font-weight:700;cursor:pointer;width:100%;">Entendi, continuar avaliando</button>
            </div>
        `;
        document.body.appendChild(popup);
        popup.querySelector('#closeHighDemandBtn').addEventListener('click', () => document.body.removeChild(popup));
        popup.addEventListener('click', (e) => { if (e.target === popup) document.body.removeChild(popup); });
    }

    function showErrorPopup(message) {
        popupTitle.textContent = 'Error';
        popupIcon.textContent = '❌';
        popupMessage.textContent = message;
        popupSubmessage.style.display = 'none';
        popupOverlay.classList.add('show');
    }

    function closePopup() {
        popupOverlay.classList.remove('show');
        popupTitle.textContent = '¡Retiro solicitado con éxito!';
        popupIcon.textContent = '✅';
        popupSubmessage.style.display = 'block';
    }

    popupClose.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) closePopup();
    });

    document.getElementById('paypalBtn').addEventListener('click', function() {
        paypalEmail.focus();
    });
});
