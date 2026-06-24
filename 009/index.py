print("ROOGUE COMPANNY")
print("Selecione abaixo o item")
produtos = {
    "TV Samsung 55": 3456,
    "S26 Ultra": 9800,
    "JBL 1000": 8760,
    "Notebook Nitro 8": 8900,
    "Moto Eletrica": 12000,
    "Geladeira Samsung": 14000,
    "TV Samsung 100": 20000,
    "Alexa 18P": 7600,
}
for produto in produtos:
    print(produto)
print("Nossos Cupons disponiveis!")
cupons = {
    "30%": 30,
    "40%": 40,
    "34%": 34,
    "21%": 21,
    "10%": 10,
    "14%": 14,
    "7%": 7,
}
for cupom in cupons:
    print(cupom)

# Cupons só podem ser usados em itens específicos (mapeamento: cupom -> lista de produtos)
cupom_para_produtos = {
    "30%": ["TV Samsung 55", "TV Samsung 100"],
    "40%": ["S26 Ultra"],
    "34%": ["JBL 1000"],
    "21%": ["Notebook Nitro 8"],
    "10%": ["Moto Eletrica", "Geladeira Samsung"],
    "14%": ["Alexa 18P"],
    "7%": ["Moto Eletrica"],
}

# Solicita a escolha do usuário uma única vez
produto_escolhido = input("Digite o nome do produto: ").strip()
cupom_escolhido = input("Digite o cupom (ex: 30%): ").strip()

if produto_escolhido not in produtos:
    print("Produto inválido.")
    raise SystemExit(1)

if cupom_escolhido not in cupons:
    print("Cupom inválido.")
    raise SystemExit(1)

# Verifica se o cupom é válido para o produto escolhido
produtos_habilitados = cupom_para_produtos.get(cupom_escolhido, [])
if produto_escolhido not in produtos_habilitados:
    print("Este cupom não pode ser usado para este produto.")
    raise SystemExit(1)

preco = produtos[produto_escolhido]
desconto = cupons[cupom_escolhido]

# Preço final com desconto
preco_final = preco * (1 - desconto / 100)
print("produto:", produto_escolhido)
print("preço original: R$", preco)
print("Desconto:", desconto, "%")
print("preço final: R$", round(preco_final, 2))
