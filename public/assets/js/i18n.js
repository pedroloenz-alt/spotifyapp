/* =========================================================
   Spotify Rewards – Auto translation (IP based) + selector
   Languages: pt (Brazil) · es (rest of LATAM/Spain) · en (fallback)
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "sp_lang";
  var AUTO_KEY = "sp_lang_auto";
  var SPANISH_COUNTRIES = [
    "AR","BO","CL","CO","CR","CU","DO","EC","SV","GT","HN","MX",
    "NI","PA","PY","PE","PR","UY","VE","GQ","ES"
  ];

  /* ---------- Dictionary: source text -> translations ---------- */
  /* Keys are the strings as they exist in the markup / scripts today. */
  var D = {
    // --- Welcome / hero ---
    "Spotify Rewards – Evaluar & Ganar": { pt: "Spotify Rewards – Avaliar & Ganhar", en: "Spotify Rewards – Evaluate & Earn" },
    "⭐ Selected Program": { pt: "⭐ Programa selecionado", es: "⭐ Programa seleccionado" },
    "¡Has sido seleccionado para evaluar música en Spotify!": { pt: "Você foi selecionado para avaliar músicas no Spotify!", en: "You have been selected to evaluate music on Spotify!" },
    "Escucha canciones y califícalas. ¡Evaluaciones ilimitadas disponibles — cada evaluación": { pt: "Ouça músicas e avalie-as. Avaliações ilimitadas disponíveis — cada avaliação", en: "Listen to songs and rate them. Unlimited evaluations available — every evaluation" },
    "se paga directamente a": { pt: "é paga diretamente na", en: "is paid directly to" },
    "tu cuenta!": { pt: "sua conta!", en: "your account!" },
    "Comenzar a evaluar →": { pt: "Começar a avaliar →", en: "Start evaluating →" },
    "🔒 Programa seguro y verificado": { pt: "🔒 Programa seguro e verificado", en: "🔒 Secure and verified program" },

    // --- Evaluation screen ---
    "Escucha la música de abajo y": { pt: "Ouça as músicas abaixo e", en: "Listen to the music below and" },
    "cobra por hacerlo": { pt: "receba por isso", en: "get paid for it" },
    "Canción 1": { pt: "Música 1", en: "Song 1" },
    "🎵 Press play, listen to the song, answer the questions below, then tap": { pt: "🎵 Toque em play, ouça a música, responda às perguntas abaixo e clique em", es: "🎵 Presiona play, escucha la canción, responde las preguntas y toca" },
    "FINISH & Ganar": { pt: "FINALIZAR & Ganhar", es: "TERMINAR & Ganar", en: "FINISH & Earn" },
    "Cargando...": { pt: "Carregando...", en: "Loading..." },
    "Previsualizar": { pt: "Prévia", en: "Preview" },
    "Artista": { pt: "Artista", en: "Artist" },
    "Guardar en Spotify": { pt: "Salvar no Spotify", en: "Save on Spotify" },
    "¿Escuchas seguido a este artista?": { pt: "Você escuta esse artista com frequência?", en: "Do you listen to this artist often?" },
    "¿Sueles escuchar esta canción?": { pt: "Você costuma ouvir essa música?", en: "Do you usually listen to this song?" },
    "Sí": { pt: "Sim", en: "Yes" },
    "No": { pt: "Não", en: "No" },
    "Terminar & Ganar": { pt: "Finalizar & Ganhar", en: "Finish & Earn" },
    "TERMINAR Y GANAR": { pt: "FINALIZAR E GANHAR", en: "FINISH AND EARN" },
    "This site is protected by reCAPTCHA and is subject to the": { pt: "Este site é protegido por reCAPTCHA e está sujeito à", es: "Este sitio está protegido por reCAPTCHA y está sujeto a la" },
    "Privacy Policy": { pt: "Política de Privacidade", es: "Política de Privacidad" },
    "and": { pt: "e", es: "y" },
    "Terms of Service": { pt: "Termos de Serviço", es: "Términos del Servicio" },
    "Evaluation Submitted!": { pt: "Avaliação enviada!", es: "¡Evaluación enviada!" },
    "Balance Received": { pt: "Saldo recebido", es: "Saldo recibido" },
    "Next Song": { pt: "Próxima música", es: "Siguiente canción" },
    "© 2026 Spotify Rewards Program. All rights reserved.": { pt: "© 2026 Spotify Rewards Program. Todos os direitos reservados.", es: "© 2026 Spotify Rewards Program. Todos los derechos reservados." },

    // --- Withdraw screen ---
    "Available Balance": { pt: "Saldo disponível", es: "Saldo disponible" },
    "Ready for instant PayPal transfer": { pt: "Pronto para transferência instantânea via PayPal", es: "Listo para transferencia instantánea por PayPal" },
    "PayPal Withdrawal": { pt: "Saque via PayPal", es: "Retiro por PayPal" },
    "Funds arrive in 1–3 business days": { pt: "O valor chega em 1 a 3 dias úteis", es: "Los fondos llegan en 1 a 3 días hábiles" },
    "PayPal Email": { pt: "E-mail do PayPal", es: "Correo de PayPal" },
    "Enter your verified PayPal email address": { pt: "Informe seu e-mail verificado do PayPal", es: "Ingresa tu correo verificado de PayPal" },
    "Amount (USD)": { pt: "Valor (USD)", es: "Monto (USD)" },
    "Minimum withdrawal limit: $6,000.00 USD | Max available: $0.00": { pt: "Limite mínimo de saque: $6.000,00 USD | Máx. disponível: $0,00", es: "Límite mínimo de retiro: $6,000.00 USD | Máx. disponible: $0.00" },
    "Transfer via PayPal": { pt: "Transferir via PayPal", es: "Transferir por PayPal" },
    "🔒 256-bit SSL encrypted · PayPal protected": { pt: "🔒 Criptografia SSL 256 bits · Protegido pelo PayPal", es: "🔒 Cifrado SSL de 256 bits · Protegido por PayPal" },
    "Processing transaction…": { pt: "Processando transação…", es: "Procesando transacción…" },
    "Solicitar Retiro": { pt: "Solicitar saque", en: "Request withdrawal" },
    "Procesando...": { pt: "Processando...", en: "Processing..." },
    "Saldo insuficiente": { pt: "Saldo insuficiente", en: "Insufficient balance" },
    "El monto mínimo es de $6,000.00": { pt: "O valor mínimo é de $6.000,00", en: "The minimum amount is $6,000.00" },
    "Por favor, completá todos los campos": { pt: "Por favor, preencha todos os campos", en: "Please fill in all fields" },
    "¡Retiro solicitado con éxito!": { pt: "Saque solicitado com sucesso!", en: "Withdrawal requested successfully!" },
    "Max available: $": { pt: "Máx. disponível: $", es: "Máx. disponible: $" },
    "You've got money!": { pt: "Você recebeu dinheiro!", es: "¡Recibiste dinero!" },

    // --- Support ---
    "Soporte": { pt: "Suporte", en: "Support" },
    "Support": { pt: "Suporte", es: "Soporte" },
    "¿Tienes problemas? Envíanos un mensaje y te responderemos dentro de 24 horas.": { pt: "Está com problemas? Envie uma mensagem e responderemos em até 24 horas.", en: "Having trouble? Send us a message and we'll reply within 24 hours." },
    "Response time": { pt: "Tempo de resposta", es: "Tiempo de respuesta" },
    "Under 24h": { pt: "Menos de 24h", es: "Menos de 24h" },
    "Availability": { pt: "Disponibilidade", es: "Disponibilidad" },
    "Security": { pt: "Segurança", es: "Seguridad" },
    "SSL 256-bit": { pt: "SSL 256 bits", es: "SSL 256 bits" },
    "📩 Send a message": { pt: "📩 Enviar uma mensagem", es: "📩 Enviar un mensaje" },
    "Full Name": { pt: "Nome completo", es: "Nombre completo" },
    "Email": { pt: "E-mail", es: "Correo electrónico" },
    "Subject": { pt: "Assunto", es: "Asunto" },
    "Select a subject": { pt: "Selecione um assunto", es: "Selecciona un asunto" },
    "Withdrawal issue": { pt: "Problema com saque", es: "Problema con el retiro" },
    "Balance Not updated": { pt: "Saldo não atualizado", es: "Saldo no actualizado" },
    "Technical problem": { pt: "Problema técnico", es: "Problema técnico" },
    "Account question": { pt: "Dúvida sobre a conta", es: "Consulta sobre la cuenta" },
    "Other": { pt: "Outro", es: "Otro" },
    "Message": { pt: "Mensagem", es: "Mensaje" },
    "Send Message": { pt: "Enviar mensagem", es: "Enviar mensaje" },
    "Mensaje enviado!": { pt: "Mensagem enviada!", en: "Message sent!" },
    "Recibimos tu mensaje y responderemos a tu correo dentro de 24 horas.": { pt: "Recebemos sua mensagem e responderemos no seu e-mail em até 24 horas.", en: "We received your message and will reply to your email within 24 hours." },
    "Send aNother": { pt: "Enviar outra", es: "Enviar otro" },
    "Please fill in all fields.": { pt: "Por favor, preencha todos os campos.", es: "Por favor, completa todos los campos." },

    // --- FAQ ---
    "FAQ": {},
    "¿Cómo recibo mi pago?": { pt: "Como recebo meu pagamento?", en: "How do I receive my payment?" },
    "Tus ganancias se acumulan con cada evaluación de canción. Una vez que completes las 10 canciones, puedes retirar tu saldo vía PayPal directamente desde la pestaña de Cobrar.": { pt: "Seus ganhos se acumulam com cada avaliação de música. Depois de completar as 10 músicas, você pode sacar seu saldo via PayPal direto na aba Sacar.", en: "Your earnings add up with each song evaluation. Once you complete the 10 songs, you can withdraw your balance via PayPal from the Withdraw tab." },
    "¿Cuánto tarda un retiro?": { pt: "Quanto tempo leva um saque?", en: "How long does a withdrawal take?" },
    "Las transferencias de PayPal suelen llegar dentro de 1 a 3 días hábiles después de ser procesadas. Recibirás una confirmación por correo electrónico una vez que los fondos hayan sido enviados.": { pt: "As transferências do PayPal normalmente chegam em 1 a 3 dias úteis após o processamento. Você receberá uma confirmação por e-mail assim que os fundos forem enviados.", en: "PayPal transfers usually arrive within 1 to 3 business days after processing. You'll get an email confirmation once the funds are sent." },
    "¿Cuál es el monto mínimo de retiro?": { pt: "Qual é o valor mínimo de saque?", en: "What is the minimum withdrawal amount?" },
    "El monto mínimo de retiro es de $6,000.00 USD. Puedes solicitar un retiro una vez que tu saldo alcance los $6,000.00.": { pt: "O valor mínimo de saque é de $6.000,00 USD. Você pode solicitar o saque quando seu saldo alcançar $6.000,00.", en: "The minimum withdrawal amount is $6,000.00 USD. You can request a withdrawal once your balance reaches $6,000.00." },
    "¿Cuántas canciones puedo evaluar por día?": { pt: "Quantas músicas posso avaliar por dia?", en: "How many songs can I evaluate per day?" },
    "Puedes evaluar canciones ilimitadas por día. Cada evaluación te recompensa con un pago que depende de la calificación de la canción.": { pt: "Você pode avaliar músicas ilimitadas por dia. Cada avaliação te recompensa com um pagamento que depende da nota da música.", en: "You can evaluate unlimited songs per day. Each evaluation rewards you with a payment based on the song's rating." },
    "¿Es legítimo este programa?": { pt: "Este programa é legítimo?", en: "Is this program legitimate?" },
    "Sí. Spotify Rewards es un programa de investigación de mercado verificado. Tus evaluaciones musicales honestas ayudan a Spotify a mejorar sus algoritmos de recomendación y la curaduría de playlists.": { pt: "Sim. O Spotify Rewards é um programa verificado de pesquisa de mercado. Suas avaliações musicais honestas ajudam o Spotify a melhorar os algoritmos de recomendação e a curadoria de playlists.", en: "Yes. Spotify Rewards is a verified market research program. Your honest music evaluations help Spotify improve its recommendation algorithms and playlist curation." },

    // --- Limits / popups ---
    "🔒 Status: Límite alcanzado": { pt: "🔒 Status: limite atingido", en: "🔒 Status: limit reached" },
    "Límite diario alcanzado!": { pt: "Limite diário atingido!", en: "Daily limit reached!" },
    "Has evaluado": { pt: "Você avaliou", en: "You have evaluated" },
    "10 canciones": { pt: "10 músicas", en: "10 songs" },
    "hoy. Retira tu saldo para continuar.": { pt: "hoje. Saque seu saldo para continuar.", en: "today. Withdraw your balance to continue." },
    "Límite diario:": { pt: "Limite diário:", en: "Daily limit:" },
    "Ganancias de hoy:": { pt: "Ganhos de hoje:", en: "Today's earnings:" },
    "Retirar dinero": { pt: "Sacar dinheiro", en: "Withdraw money" },
    "🔒 Retiro instantáneo desbloqueado": { pt: "🔒 Saque instantâneo desbloqueado", en: "🔒 Instant withdrawal unlocked" },
    "Ahora": { pt: "Agora", en: "Now" },
    "Pago recibido": { pt: "Pagamento recebido", en: "Payment received" },
    "evaluar": { pt: "avaliar", en: "evaluate" },
    "Retirar": { pt: "Sacar", en: "Withdraw" },
    "Límite alcanzado": { pt: "Limite atingido", en: "Limit reached" },
    "Las próximas evaluaciones estarán disponibles en:": { pt: "As próximas avaliações estarão disponíveis em:", en: "The next evaluations will be available in:" },
    "OK, entendido": { pt: "OK, entendi", en: "Got it" },
    "¡Todo listo!": { pt: "Tudo pronto!", en: "All done!" },
    "Ya evaluaste todas las canciones disponibles. ¿Quieres reiniciar para seguir ganando?": { pt: "Você já avaliou todas as músicas disponíveis. Quer reiniciar para continuar ganhando?", en: "You've evaluated every available song. Do you want to restart and keep earning?" },
    "Hoy": { pt: "Hoje", en: "Today" },
    "Total": {},
    "Reiniciar y continuar": { pt: "Reiniciar e continuar", en: "Restart and continue" },
    "Cancelar": { pt: "Cancelar", en: "Cancel" },
    "¡Felicitaciones!": { pt: "Parabéns!", en: "Congratulations!" },
    "¡Ganaste!": { pt: "Você ganhou!", en: "You earned!" },
    "No se encontraron canciones": { pt: "Nenhuma música encontrada", en: "No songs found" },
    "Agrega tus archivos de audio en assets/audio/.": { pt: "Adicione seus arquivos de áudio em assets/audio/.", en: "Add your audio files to assets/audio/." },
    "Evaluation limit reached": { pt: "Limite de avaliações atingido", es: "Límite de evaluaciones alcanzado" },
    "The next evaluations will be available in:": { pt: "As próximas avaliações estarão disponíveis em:", es: "Las próximas evaluaciones estarán disponibles en:" },
    "Come back in 4 hours to keep earning 💰": { pt: "Volte em 4 horas para continuar ganhando 💰", es: "Vuelve en 4 horas para seguir ganando 💰" },
    "Got it, I'll come back later": { pt: "Entendi, volto mais tarde", es: "Entendido, vuelvo más tarde" },

    // --- High demand popup (EN + PT variants in code) ---
    "Withdrawal temporarily limited": { pt: "Saque temporariamente limitado", es: "Retiro temporalmente limitado" },
    "Saque temporariamente limitado": { es: "Retiro temporalmente limitado", en: "Withdrawal temporarily limited" },
    "Due to": { pt: "Devido à", es: "Debido a la" },
    "Devido à": { es: "Debido a la", en: "Due to" },
    "high withdrawal demand": { pt: "alta demanda de saques", es: "alta demanda de retiros" },
    "alta demanda de saques": { es: "alta demanda de retiros", en: "high withdrawal demand" },
    "on the platform, the minimum withdrawal amount has been temporarily adjusted to": { pt: "na plataforma, o valor mínimo para saque foi ajustado temporariamente para", es: "en la plataforma, el monto mínimo de retiro fue ajustado temporalmente a" },
    "na plataforma, o valor mínimo para retirada foi ajustado temporariamente para": { es: "en la plataforma, el monto mínimo de retiro fue ajustado temporalmente a", en: "on the platform, the minimum withdrawal amount has been temporarily adjusted to" },
    "📢 This measure protects users and ensures payment security. Keep evaluating songs to reach the limit!": { pt: "📢 Esta medida protege os usuários e garante a segurança dos pagamentos. Continue avaliando músicas para atingir o limite!", es: "📢 Esta medida protege a los usuarios y garantiza la seguridad de los pagos. ¡Sigue evaluando canciones para alcanzar el límite!" },
    "📢 Esta medida protege os usuários e garante a segurança dos pagamentos. Continue avaliando músicas para atingir o limite!": { es: "📢 Esta medida protege a los usuarios y garantiza la seguridad de los pagos. ¡Sigue evaluando canciones para alcanzar el límite!", en: "📢 This measure protects users and ensures payment security. Keep evaluating songs to reach the limit!" },
    "Got it, keep evaluating": { pt: "Entendi, continuar avaliando", es: "Entendido, seguir evaluando" },
    "Entendi, continuar avaliando": { es: "Entendido, seguir evaluando", en: "Got it, keep evaluating" },

    // --- Exit / gift card / expiry ---
    "¡Espera!": { pt: "Espere!", en: "Wait!" },
    "Tienes": { pt: "Você tem", en: "You have" },
    "acumulados que podrías perder si no desbloqueas tu cuenta hoy.": { pt: "acumulados que você pode perder se não desbloquear sua conta hoje.", en: "accumulated that you could lose if you don't unlock your account today." },
    "🔓 Desbloquear y Sacar Ahora": { pt: "🔓 Desbloquear e sacar agora", en: "🔓 Unlock and withdraw now" },
    "Salir sin retirar": { pt: "Sair sem sacar", en: "Leave without withdrawing" },
    "Tarjeta Amazon $100": { pt: "Cartão Amazon $100", en: "$100 Amazon Card" },
    "¡Tienes una": { pt: "Você tem um", en: "You have a" },
    "tarjeta de regalo de Amazon de $100": { pt: "cartão-presente Amazon de $100", en: "$100 Amazon gift card" },
    "esperándote!": { pt: "esperando por você!", en: "waiting for you!" },
    "Podrás retirarla junto con tu saldo acumulado al activar tu cuenta": { pt: "Você poderá resgatá-lo junto com seu saldo acumulado ao ativar sua conta", en: "You'll be able to redeem it with your balance when you activate your account" },
    "Premium": {},
    "El código será enviado directamente a tu correo de PayPal.": { pt: "O código será enviado direto para o e-mail do seu PayPal.", en: "The code will be sent straight to your PayPal email." },
    "🔓 Desbloquear y Recibir mi Tarjeta": { pt: "🔓 Desbloquear e receber meu cartão", en: "🔓 Unlock and get my card" },
    "Más tarde": { pt: "Mais tarde", en: "Later" },
    "expira en": { pt: "expira em", en: "expires in" },
    "7 días": { pt: "7 dias", en: "7 days" },
    "Retíralo ahora →": { pt: "Saque agora →", en: "Withdraw now →" },
    "retiró": { pt: "sacou", en: "withdrew" },
    "hace": { pt: "há", en: "" },
    "min": {},

    // --- Quick praise popups ---
    "¡Buena elección! 💸": { pt: "Boa escolha! 💸", en: "Great choice! 💸" },
    "¡Bien! ¡Sigue así! 🎯": { pt: "Boa! Continue assim! 🎯", en: "Nice! Keep it up! 🎯" },
    "¡Genial! 🌟": { pt: "Ótimo! 🌟", en: "Awesome! 🌟" },
    "¡Perfecto! 💎": { pt: "Perfeito! 💎", en: "Perfect! 💎" },
    "¡Excelente! ⭐": { pt: "Excelente! ⭐", en: "Excellent! ⭐" },
    "¡Lo estás haciendo muy bien! 🚀": { pt: "Você está indo muito bem! 🚀", en: "You're doing great! 🚀" },
    "¡Sigue así! 💪": { pt: "Continue assim! 💪", en: "Keep going! 💪" },
    "¡Increíble! 🎉": { pt: "Incrível! 🎉", en: "Amazing! 🎉" },

    // --- Attributes / placeholders ---
    "Your name": { pt: "Seu nome", es: "Tu nombre" },
    "your@email.com": {},
    "Describe your issue...": { pt: "Descreva seu problema...", es: "Describe tu problema..." },
    "e.g. 6000.00": { pt: "ex.: 6000.00", es: "ej. 6000.00" },
    "Cover": { pt: "Capa", es: "Portada" },
    "Spotify Evaluator": { pt: "Avaliador Spotify", es: "Evaluador Spotify" }
  };

  /* ---------- Interpolated sentences ---------- */
  var PATTERNS = [
    [/^🎉 Song finished! Answer the questions below and tap$/, { pt: "🎉 Música finalizada! Responda às perguntas abaixo e toque em", es: "🎉 ¡Canción finalizada! Responde las preguntas y toca" }],
    [/^🎵 Listen to the song \((\d+)s remaining\) to unlock the questions\.$/, { pt: "🎵 Ouça a música ($1s restantes) para liberar as perguntas.", es: "🎵 Escucha la canción (faltan $1s) para desbloquear las preguntas." }],
    [/^🎵 Presiona play y escucha la canción para desbloquear las preguntas de evaluación\.$/, { pt: "🎵 Toque em play e ouça a música para liberar as perguntas da avaliação.", en: "🎵 Press play and listen to the song to unlock the evaluation questions." }],
    [/^¿Escuchas a (.+) seguido\?$/, { pt: "Você escuta $1 com frequência?", en: "Do you listen to $1 often?" }],
    [/^¿Sueles escuchar (.+)\?$/, { pt: "Você costuma ouvir $1?", en: "Do you usually listen to $1?" }],
    [/^Song (\d+)$/, { pt: "Música $1", es: "Canción $1" }],
    [/^Canción (\d+)$/, { pt: "Música $1", en: "Song $1" }],
    [/^(\d+) completadas$/, { pt: "$1 concluídas", en: "$1 completed" }],
    [/^Spotify Rewards sent you \$(.+) USD\.$/, { pt: "O Spotify Rewards enviou $$$1 USD para você.", es: "Spotify Rewards te envió $$$1 USD." }],
    [/^Recibiste \$(.+) de Spotify Rewards\.$/, { pt: "Você recebeu $$$1 do Spotify Rewards.", en: "You received $$$1 from Spotify Rewards." }],
    [/^El retiro de \$(.+) ha sido solicitado con éxito\.$/, { pt: "O saque de $$$1 foi solicitado com sucesso.", en: "The withdrawal of $$$1 was requested successfully." }],
    [/^¡Excelente trabajo! Completaste las (\d+) evaluaciones de esta sesión\.$/, { pt: "Excelente trabalho! Você concluiu as $1 avaliações desta sessão.", en: "Great job! You completed the $1 evaluations of this session." }],
    [/^You have completed the (\d+) evaluations for this session\.$/, { pt: "Você concluiu as $1 avaliações desta sessão.", es: "Completaste las $1 evaluaciones de esta sesión." }],
    [/^Vuelve en (\d+) horas para seguir ganando 💰$/, { pt: "Volte em $1 horas para continuar ganhando 💰", en: "Come back in $1 hours to keep earning 💰" }],
    [/^¡Completaste las (\d+) evaluaciones de hoy!$/, { pt: "Você concluiu as $1 avaliações de hoje!", en: "You completed today's $1 evaluations!" }],
    [/^Max available: \$(.+)$/, { pt: "Máx. disponível: $$$1", es: "Máx. disponible: $$$1" }],
    [/^Minimum withdrawal limit: \$([\d.,]+) USD \| Max available: \$(.+)$/, { pt: "Limite mínimo de saque: $$$1 USD | Máx. disponível: $$$2", es: "Límite mínimo de retiro: $$$1 USD | Máx. disponible: $$$2" }]
  ];

  var ATTRS = ["placeholder", "title", "alt", "aria-label"];
  var lang = "es";

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function translateString(raw) {
    var key = normalize(raw);
    if (!key) return null;
    var entry = D[key];
    if (entry && entry[lang]) return entry[lang];
    for (var i = 0; i < PATTERNS.length; i++) {
      var m = key.match(PATTERNS[i][0]);
      if (m) {
        var target = PATTERNS[i][1][lang];
        if (!target) return null;
        return target.replace(/\$(\d)/g, function (_, n) {
          return m[Number(n)] || "";
        });
      }
    }
    return null;
  }

  function translateTextNode(node) {
    var raw = node.nodeValue;
    if (!raw || !/[A-Za-zÀ-ÿ]/.test(raw)) return;
    var parent = node.parentNode;
    if (!parent) return;
    var tag = parent.nodeName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return;
    if (parent.closest && parent.closest("[data-i18n-skip]")) return;
    var out = translateString(raw);
    if (out === null) return;
    var lead = raw.match(/^\s*/)[0];
    var trail = raw.match(/\s*$/)[0];
    node.nodeValue = lead + out + trail;
  }

  function translateElement(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var attr = ATTRS[i];
      var value = el.getAttribute && el.getAttribute(attr);
      if (value) {
        var out = translateString(value);
        if (out !== null) el.setAttribute(attr, out);
      }
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) translateElement(root);
    if (root.querySelectorAll) {
      var els = root.querySelectorAll("*");
      for (var i = 0; i < els.length; i++) translateElement(els[i]);
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (var j = 0; j < nodes.length; j++) translateTextNode(nodes[j]);
  }

  function translateDocument() {
    if (lang === "es") {
      // Source content is mostly Spanish, but some strings are EN/PT.
      walk(document.body);
      applyTitle();
      return;
    }
    walk(document.body);
    applyTitle();
  }

  function applyTitle() {
    var out = translateString(document.title);
    if (out !== null) document.title = out;
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);
  }

  /* ---------- Language detection ---------- */
  function langFromCountry(country) {
    if (!country) return null;
    if (country === "BR") return "pt";
    if (country === "PT") return "pt";
    if (SPANISH_COUNTRIES.indexOf(country) !== -1) return "es";
    return "en";
  }

  function langFromNavigator() {
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("pt") === 0) return "pt";
    if (nav.indexOf("es") === 0) return "es";
    return "en";
  }

  function stored(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function store(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* ignore */
    }
  }

  function resolveInitialLang() {
    return stored(STORAGE_KEY) || stored(AUTO_KEY) || langFromNavigator();
  }

  function detectByIp() {
    if (stored(STORAGE_KEY)) return; // manual choice wins
    fetch("/api/public/geo", { headers: { accept: "application/json" } })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (data) {
        var detected = langFromCountry(data && data.country);
        if (!detected) return;
        store(AUTO_KEY, detected);
        if (detected !== lang) setLang(detected, false);
      })
      .catch(function () {
        /* offline: keep current */
      });
  }

  /* ---------- Language selector ---------- */
  var LABELS = { pt: "Português", es: "Español", en: "English" };
  var FLAGS = { pt: "🇧🇷", es: "🇪🇸", en: "🇺🇸" };

  function buildSelector() {
    if (document.getElementById("spLangSwitcher")) return;
    var wrap = document.createElement("div");
    wrap.id = "spLangSwitcher";
    wrap.setAttribute("data-i18n-skip", "");
    wrap.style.cssText =
      "position:fixed;top:10px;right:10px;z-index:100000;font-family:inherit;";

    var select = document.createElement("select");
    select.setAttribute("aria-label", "Language");
    select.style.cssText =
      "background:rgba(0,0,0,0.72);color:#fff;border:1px solid rgba(29,185,84,0.55);" +
      "border-radius:999px;padding:6px 10px;font-size:12px;font-weight:700;" +
      "backdrop-filter:blur(6px);cursor:pointer;outline:none;appearance:none;";

    ["pt", "es", "en"].forEach(function (code) {
      var opt = document.createElement("option");
      opt.value = code;
      opt.textContent = FLAGS[code] + " " + LABELS[code];
      opt.style.color = "#000";
      select.appendChild(opt);
    });
    select.value = lang;
    select.addEventListener("change", function () {
      store(STORAGE_KEY, select.value);
      setLang(select.value, true);
    });
    wrap.appendChild(select);
    document.body.appendChild(wrap);
  }

  function syncSelector() {
    var wrap = document.getElementById("spLangSwitcher");
    if (wrap) wrap.querySelector("select").value = lang;
  }

  /* ---------- Applying a language ---------- */
  function setLang(next, reload) {
    if (next === lang) return;
    if (reload) {
      // Simplest reliable way to re-render every dynamic string.
      window.location.reload();
      return;
    }
    lang = next;
    translateDocument();
    syncSelector();
  }

  function start() {
    lang = resolveInitialLang();
    translateDocument();
    buildSelector();
    detectByIp();

    var observer = new MutationObserver(function (mutations) {
      observer.disconnect();
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target);
        } else {
          for (var j = 0; j < mutation.addedNodes.length; j++) {
            walk(mutation.addedNodes[j]);
          }
        }
      }
      observe();
    });

    function observe() {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
    observe();

    window.SPI18N = {
      get lang() {
        return lang;
      },
      set: function (code) {
        store(STORAGE_KEY, code);
        setLang(code, true);
      },
      t: translateString,
      refresh: translateDocument,
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
