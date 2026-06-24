print("FUJA!")
caminho = int(input("Qual caminho escolher 1 para ponte, 2 para tunel: "))
if caminho == 1:
    print("caminho ponte")
    ponte = str(input("A ponte esta ok?")) 
    blindado = str(input("possui um blindado?"))
    if blindado == "sim" and ponte == "sim":
     print("Voce fugiu!")
    else:
       print("Ops, requisitos nao disponiveis")

elif caminho == 2:
    print("caminho tunel")
    mascara_gas = str(input("possui mascara de gas? "))
    passcard = str(input("possui cartao de acesso? "))
    if  mascara_gas == "sim" and passcard == "sim":
        print("voce fugiu")
    else:
       print("Ops vc nao possui os requisitos")
    
        
else:
    print("morreu")

