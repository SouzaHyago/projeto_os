-- criar nova categoria
INSERT INTO categorias (nome) VALUES ('doces');

--Listar categorias
SELECT nome FROM categorias;

--atualizar categoria
UPDATE categorias SET nome = "coisas legais" where id = 3;

--deletar categoria
DELETE FROM categorias WHERE id = 1;
