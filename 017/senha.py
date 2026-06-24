cont = 0
senha = input("DIgite sua senha: ")
while True:
    if senha == "12345":
        print("seja bem vindex")
        break
    else:
        cont = cont + 1
        if cont < 3:
         print("Acesso negado")
         senha = input("tente novamente ")
        else: 
            print("bloqueado")
            break
print("FIM")
