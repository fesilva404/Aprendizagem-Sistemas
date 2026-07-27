while True:
    print("1")
    print("2")
    print("3")
    print("4")
    print("5")
    print("0")

    client = int(input("Escolha uma opçao: "))
    if client == 1:
        print("Voce escolheu a primeira opçao")
    elif client == 2:
        print("Dois")
    elif client == 3:
        print("Tres")
    elif client == 4:
        print("Quatro")
    elif client == 5:
        print("Cinco")
    elif client == 0:
        print("Saindo do programa!")
        break
    else:
        print("opçao nao disponivel!")
       
print("Voce saiu do programa")