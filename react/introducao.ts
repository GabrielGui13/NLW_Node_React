type User = {
    name: string, 
    address: {
        city: string,
        uf: string
    }
};

function showWelcomeMessage(user: User) {
    return `Welcome ${user.name} (${user.address.city} - ${user.address.uf})`
}

showWelcomeMessage({
    name: 'Gabriel',
    address: {
        city: "Natal",
        uf: "RN"
    }
}) //mostra todos os erros de typecast durante


//yarn create react-app letmeask --template typescript     forma de criar arquivo completo para react em typescript
//yarn start     para rodar a aplicacao

//na pasta public, remover tudo que nao for "index.html"
//na pasta src, manter apenas "App.tsx", "index.tsx", "react-app-env.d.ts"
//no index.html apagar tudo que nao for o utf-8, title e meta viewport, e manter apenas o div root
//no index.tsx apagar as linhas de comentario e reportWebVitals, e o import de webvitals e o import de index.css
//no App.tsx apagar todos os import, e trocar o html do return por <h1>Hello World!</h1>