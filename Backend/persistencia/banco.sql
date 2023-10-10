CREATE TABLE livro (
    isbn varchar(13) not null primary key,
    titulo varchar(255) not null,
    autor varchar(140) not null,
    editora varchar(140) not null,
    anoPublicacao int not null,
    edicao int not null,
    numPaginas int not null,
    genero varchar(50) not null,
    dataEntrada date not null
);


-- falta tabela do projeto