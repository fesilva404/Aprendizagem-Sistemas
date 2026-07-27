clientes = { "12256786535": {"nome": "Ana Silva", "idade":56, "compras":[120.60,90.00,12,99],"categoria":"Regular"},

}

def cadastrar_cliente():
    cpf_chave = input("Digite o CPF do cliente: ")
    novo_cliente = {}
    novo_cliente["nome"] = input("Digite o nome do cliente: ")
    novo_cliente["idade"] = int(input("Digite a idade do cliente: "))
    novo_cliente["compras"] = []
    novo_cliente["categoria"] = "Regular"
    clientes[cpf_chave] = novo_cliente
    print(f"Cliente {novo_cliente['nome']}cadrastado com sucesso!")

def atualizar_categoria_vip():
    promovidos = []
    for cpf, dados in clientes.items():
        if dados["categoria"] == "Regular":
            total_gastos = sum(dados["compras"])
            if total_gastos > 100.00:
                dados["categoria"] = "VIP"
                promovidos.append((dados["nome"], total_gastos))
if promovidos:
    print("att categorias")
    for nome,total in promovidos:
        print(f"{nome} foi promovido(a) para VIP (fasto total: R$ {total:.2f})")
        print()
    else:
        print("\nNemhma cliente atingiu o criterio.\n")

def gerar_relatorio():
    total_cliente = len(clientes)
    if total_cliente = len(clientes)