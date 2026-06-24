-- schema.sql
-- Exemplo de banco relacional (SQL) para a cafeteria.
-- (Serve como documentação/estrutura; não é executado automaticamente no site.)

CREATE TABLE IF NOT EXISTS clientes (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  nome          VARCHAR(120) NOT NULL,
  telefone      VARCHAR(30)  NOT NULL,
  criado_em     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id    INTEGER NOT NULL,
  retirada_tipo VARCHAR(30) NOT NULL, -- balcao | retirada | entrega
  observacoes   TEXT,
  total         DECIMAL(10,2) NOT NULL,
  criado_em     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS itens_pedido (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id     INTEGER NOT NULL,
  item_key      VARCHAR(60) NOT NULL,
  item_label    VARCHAR(120) NOT NULL,
  preco_unit    DECIMAL(10,2) NOT NULL,
  criado_em     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Índices recomendados
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_itens_pedido ON itens_pedido(pedido_id);

