--Gerar ordem de serviço


--1° selecionar dos dados da compras para mostra-lós
SELECT * FROM compras WHERE id = 1;

--2° puxar os dados do cliente a partir dos id's adiquiridos no primeiro select para adicionar na tela
SELECT u.nome,u.email,u.cpf,u.telefone, i.nome AS produto, i.descricao, i.valor FROM usuarios u, compras c, itens i WHERE c.id_usuario = 1 AND c.id_item = 2;

--3°puxar dados do item a partir dos id's adiquiridos no primero select
SELECT  FROM itens i, compras c WHERE 