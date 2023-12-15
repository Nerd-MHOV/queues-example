import Mail from '../lib/Mail'

export default {
    key: "RegistrationMail",
    options: {},
    async handle({ data }) {
        const { user } = data;
        await Mail.sendMail({
            from: "Queue Test <queue@queuetest.com.br>",
            to: `${user.name} <${user.email}>`,
            subject: "Cadastro de Usuário",
            html: `Olá, ${user.name}, bem-vindo ao Nerd's developers`
        })

    }
}