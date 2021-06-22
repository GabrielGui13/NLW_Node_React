//nomeDaVariavel:tipoDaVariavel

interface User {
    nome: string, email: string, telefone?: string //A ? torna o parametro opcional
}

function enviarEmail({nome, email, telefone}: User) { //destructuring
    console.log(`Ola ${/*user.*/nome} seu email eh ${email} e seu telefone eh ${telefone}`)
}

/* enviarEmail("Gabriel", "gabrielguilherme13@hotmail.com", "999110101") */
enviarEmail({
    nome: "Gabriel",
    email: "gabrielguilherme13@hotmail.com"
})

//Nao esta funcionando pois o node nao reconhece o TypeScript
// yarn init -y                                  iniciar o package.json
// yarn add TypeScript -D                        cria para desenvolvimento
// yarn add express                              adiciona normalmente 
// yarn tsc --init                               para inicializar o typescript, mudar o strict para false
// yarn tsc                                      cria um codigo clone em javascript e roda eles
// yarn -i                                       instala as dependencias
// yarn add ts-node-dev -D                       para automatizar a conversao do yarn tsc, colocar como script no JSON, quase igual o nodemon
// yarn add typeorm reflect-metadata sqlite3     adiciona novos modulos
// yarn typeorm                                  declarado no script do package.json
// yarn typeorm migration:create -n CreateUsers  cria uma migration no diretorio passado no ormconfig.json
// yarn typeorm migration:run                    executa a ultima migration do ormconfig (migrations) usando o codigo do up
// yarn typeorm migration:revert                 executa a ultima migration do ormconfig (migrations) usando o codigo do down
// yarn entity:create -n User                    cria uma entidade no diretorio dentro do ormconfig

// migrations controlam o formato do banco, enquanto os repositories controlam os dados 

//Forma de criar o package.json e instalar as dependencias