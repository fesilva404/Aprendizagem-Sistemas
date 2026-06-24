valor = int(input("Digite o valor total da compra: "))
vip = str(input("Voce é vip da loja? "))
if valor >= 1000 and vip == "sim":
 desconto = valor * 0,15
 print("desconto vip")
elif valor >= 1000 or vip == "sim" and "Sim" and "S" and "s":
 desconto = valor * 0.10
 valorFinal = valor - desconto  
 print("voce ganhou um desconto de 10%")
 print("seu desconto é de: ","R$", valor * 0.10 )
 print("Total: ", valorFinal)
elif valor >= 1000 and vip == "sim" and "Sim" and "s" and "S" :
 print("Voce ganhou desconto a mais de 5%, por ser VIP!!")
 desconto = valor * 0.15
 valorFinal = valor - desconto  
 print("voce ganhou um desconto de 15%")
 print("seu desconto é de: ","R$", valor * 0.15 )
 print("Total: ", valorFinal)
else:
 print("Infelizmente voce nao possui descontos disponiveis")