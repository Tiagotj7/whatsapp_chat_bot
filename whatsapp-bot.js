// Bot de atendimento para serviços de TI no WhatsApp
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configuração do cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Confirma conexão
client.on('qr', (qr) => {
    console.log('📱 Escaneie o QR Code abaixo para conectar o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot de TI conectado ao WhatsApp!');
    console.log('🤖 Aguardando mensagens...');
});

client.on('auth_failure', () => {
    console.log('❌ Falha na autenticação do WhatsApp');
});

client.on('disconnected', (reason) => {
    console.log('❌ Bot desconectado:', reason);
});

// Função para simular delay (digitação)
const delay = ms => new Promise(res => setTimeout(res, ms));

// Quando recebe mensagem
client.on('message', async (msg) => {
    // Só responde no privado (não em grupos)
    if (msg.from.includes('@g.us')) {
        return; // Ignora mensagens de grupos
    }

    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const texto = msg.body ? msg.body.toLowerCase() : '';
    
    // Exibe no console
    console.log(`💬 Mensagem de ${contact.name || contact.pushname}: ${texto}`);

    // Simula "digitando..."
    await chat.sendStateTyping();

    await delay(1000);

    // -----------------------
    // 🔹 1. Saudação e Menu Principal
    if (texto.match(/^(oi|olá|ola|menu|bom dia|boa tarde|boa noite|iniciar|start)$/)) {
        const menuMessage = `🛠️ *Bem-vindo ao Suporte de TI!*\n\nOlá ${contact.name || contact.pushname}! Eu sou o *Assistente Virtual de TI*.\n\n*Como posso ajudá-lo hoje?*\n\nDigite o *número* ou *palavra-chave*:\n\n🕒 *1* - Horários de Atendimento\n💻 *2* - Serviços de TI\n🌐 *3* - Redes Sociais\n👨‍💼 *4* - Falar com Atendente\n📞 *5* - Contato Urgente\n\nOu digite *menu* a qualquer momento para voltar aqui.`;
        
        await msg.reply(menuMessage);
    }

    // -----------------------
    // 🔹 2. Horários de Atendimento
    else if (texto.includes('1') || texto.includes('horário') || texto.includes('horario')) {
        const horariosMessage = `🕒 *Horários de Atendimento*\n\n*Atendimento Padrão:*\n📍 Segunda a Sexta: 8h às 18h\n📍 Sábado: 8h às 12h\n📍 Domingo: Fechado\n\n*Plantão de Emergência:*\n🚨 24h para casos críticos\n📞 (11) 9999-9999\n\n*Tipos de Suporte:*\n✅ Suporte Remoto: 8h-18h\n✅ Visita Técnica: 9h-17h\n✅ Urgências: 24h/7d\n\nDigite *menu* para voltar ao menu principal.`;
        
        await msg.reply(horariosMessage);
    }

    // -----------------------
    // 🔹 3. Serviços de TI
    else if (texto.includes('2') || texto.includes('serviço') || texto.includes('servico')) {
        const servicosMessage = `💻 *Nossos Serviços de TI*\n\n*🔧 Suporte Técnico:*\n✅ Manutenção de Computadores\n✅ Instalação de Software\n✅ Configuração de Redes\n✅ Backup de Dados\n✅ Remoção de Vírus\n\n*🌐 Infraestrutura:*\n✅ Servidores e Cloud\n✅ Redes Corporativas\n✅ Firewall e Segurança\n✅ Wi-Fi Empresarial\n\n*🚀 Desenvolvimento:*\n✅ Sites e Sistemas Web\n✅ Aplicativos Mobile\n✅ Banco de Dados\n✅ Automação\n\n*Valores a partir de R$ 99,90/mês*\n\nPara orçamento, digite *4* para falar com nosso atendente.\n\nDigite *menu* para voltar ao menu principal.`;
        
        await msg.reply(servicosMessage);
    }

    // -----------------------
    // 🔹 4. Redes Sociais
    else if (texto.includes('3') || texto.includes('rede') || texto.includes('social')) {
        const redesMessage = `🌐 *Nossas Redes Sociais*\n\n*Acompanhe nosso trabalho:*\n\n📘 *Facebook:*\nfacebook.com/suporteti\n\n📷 *Instagram:*\n@suporteti.oficial\n\n💼 *LinkedIn:*\nlinkedin.com/company/suporteti\n\n🐦 *Twitter:*\n@suporteti\n\n📹 *YouTube:*\nyoutube.com/suporteti\n\n💻 *Site Oficial:*\nwww.suporteti.com.br\n\nDigite *menu* para voltar ao menu principal.`;
        
        await msg.reply(redesMessage);
    }

    // -----------------------
    // 🔹 5. Falar com Atendente
    else if (texto.includes('4') || texto.includes('atendente') || texto.includes('humano')) {
        const atendenteMessage = `👨‍💼 *Falar com Atendente*\n\nUm dos nossos especialistas entrará em contato em breve!\n\n*Informações para contato:*\n📞 Telefone: (11) 3333-4444\n📧 Email: contato@suporteti.com.br\n💬 WhatsApp: (11) 99999-8888\n\n*Tempo médio de resposta:*\n✅ Online: 2-5 minutos\n✅ Email: 1-2 horas\n✅ Telefone: Imediato\n\nDeseja que entremos em contato agora? Responda *SIM* ou digite *menu* para voltar.`;
        
        await msg.reply(atendenteMessage);
    }

    // -----------------------
    // 🔹 6. Contato Urgente
    else if (texto.includes('5') || texto.includes('urgente') || texto.includes('emergencia')) {
        const urgenteMessage = `🚨 *CONTATO DE EMERGÊNCIA*\n\n*Para atendimento IMEDIATO:*\n\n📞 *Plantão 24h:* (11) 9999-9999\n💬 *WhatsApp Urgente:* (11) 8888-7777\n🆘 *Email Crítico:* emergencia@suporteti.com.br\n\n*Casos para Emergência:*\n🔴 Servidor Fora do Ar\n🔴 Rede Totalmente Inoperante\n🔴 Perda Crítica de Dados\n🔴 Ataque Cibernético\n🔴 Sistema Principal Inacessível\n\n*Taxa de emergência: R$ 200,00*\n\nDigite *menu* para voltar ao menu principal.`;
        
        await msg.reply(urgenteMessage);
    }

    // -----------------------
    // 🔹 7. Confirmação de contato
    else if (texto.includes('sim') && (msg._data.quotedMsg && msg._data.quotedMsg.body.includes('Deseja que entremos em contato agora?'))) {
        const confirmacaoMessage = `✅ *Solicitação confirmada!*\n\nAnotamos seu contato e nossa equipe entrará em contato em até 5 minutos.\n\n*Seus dados:*\n👤 Nome: ${contact.name || contact.pushname}\n📱 WhatsApp: ${contact.id.user}\n\nEnquanto isso, posso ajudar em mais alguma coisa?\n\nDigite *menu* para ver as opções.`;
        
        await msg.reply(confirmacaoMessage);
    }

    // -----------------------
    // 🔹 8. Agradecimento
    else if (texto.includes('obrigado') || texto.includes('obrigada') || texto.includes('valeu') || texto.includes('grato')) {
        const agradecimentoMessage = `😊 *Obrigado pelo contato!*\n\nFicamos felizes em ajudar! Se tiver mais alguma dúvida sobre nossos serviços de TI, é só chamar.\n\n*Equipe Suporte TI* 🛠️\n\nDigite *menu* para um novo atendimento.`;
        
        await msg.reply(agradecimentoMessage);
    }

    // -----------------------
    // 🔹 9. Fallback (não entendeu)
    else if (texto && !texto.match(/^(menu|sair|fim)$/)) {
        const fallbackMessage = `🤔 *Desculpe, não entendi completamente.*\n\nVocê pode digitar *menu* para ver todas as opções ou escolher uma das opções abaixo:\n\n*1* - Horários de Atendimento\n*2* - Serviços de TI\n*3* - Redes Sociais\n*4* - Falar com Atendente\n*5* - Contato Urgente\n\nOu digite *sair* para encerrar o atendimento.`;
        
        await msg.reply(fallbackMessage);
    }

    // -----------------------
    // 🔹 10. Encerrar atendimento
    else if (texto.match(/^(sair|fim|tchau|bye)$/)) {
        const despedidaMessage = `👋 *Atendimento encerrado!*\n\nObrigado por entrar em contato com o Suporte de TI!\n\nSe precisar de ajuda novamente, é só mandar uma mensagem.\n\n*Tenha um ótimo dia!* 🛠️`;
        
        await msg.reply(despedidaMessage);
    }
});

// Inicializa o bot
client.initialize();

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.log('❌ Erro não tratado:', reason);
});

process.on('uncaughtException', (error) => {
    console.log('❌ Exceção não capturada:', error);
});