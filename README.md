# node-sass

npm install
git clone git@github.com:inframobliza/player.git //ou cociar e colar 
git clone git@github.com:inframobliza/clients.git //ou copiar e colar

node app.js

Cria um arquivos css compilado com váriaveis dinamicas baseadas no template na raiz do projeto;
Template atende padrões 1;

## TODO
* Provavelmente vá ser uma rota assim não precisa gravar nada em disco
* Rota precisará identificar se é um padrão custom(com arquivos na S3) ou padrão que compila css dinamico
* Compilar css para player(geral.css) e editor(editor.css) 
* Criar templates para cada padrão
* Validar api de /patterns
* Como esta rota (algo do tipo /api/patterns/:id/action/generate-css) var retornar o css temos que fazer o NGnix rotear apartir dessa rota para S3 para pegar imagens, fonts, icons...

## Pesquisar
* Serviço dependente de vários arquivos estáticos, melhores práticas? EFS? 
* Preview? Como vamos fazer apra ter preview destas interfaces?
