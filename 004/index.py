nome = str(input("Digite seu nome: "))
idade = int(input("Digite sua idade: "))
if idade < 18:
    print("acesso bloqueado!")
    exit()
senha = int(input("digite sua senha: "))
if senha == 1234:
       print("Acesso liberado")
else:
       print("senha incorreta")
       exit()
print("Bem-Vindo ao banco master") 
saldo = 2000
print("seu saldo é", saldo )
compra = int(input("Digite o valor da compra: "))
print("compra aprovada!")
print("saldo atual:",saldo - compra)
        