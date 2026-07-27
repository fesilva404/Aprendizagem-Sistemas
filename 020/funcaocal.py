def menu():
    while True:
        print("""Escolha uma das opções abaixo:
            1 - Soma
            2 - Subtração
            3 - Multiplicação
            4 - Divisão
            5 - Sair""")
        
        opcao = input("Digite a opção desejada: ")

        if opcao == "1":
            soma()
        elif opcao == "2":
            subtracao()
        elif opcao == "3":
            multiplicacao()
        elif opcao == "4":
            divisao()
        elif opcao == "5":
            print("Saindo do programa...")
            break
        else:
            print("Opção inválida. Tente novamente.")
            
num1 = int(input("Digite o primeiro numero: "))
num2 = int(input("Digite o segundo numero: ")) 
def soma():
    resultado = num1 + num2
    print(f"O resultado da soma é: {resultado}")
    
def subtracao():
    resultado = num1 - num2
    print(f"O resultado da subtração é: {resultado}")

def multiplicacao():
    resultado = num1 * num2
    print(f"O resultado da multiplicação é: {resultado}")

def divisao():
    if num2 != 0:
        resultado = num1 / num2
        print(f"O resultado da divisão é: {resultado}")
    else:
        print("Erro: Divisão por zero não é permitida.") 

menu()