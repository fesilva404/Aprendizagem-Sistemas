print("compras maças")
macas = int(input("Digite a quantidade de maças desejada: "))
if macas < 12:
 print("Valor Total: ",macas * 0.30)
elif macas >= 12:
 print("Voce possui desconto! aprtir de uma duzia o valor é 0,25!")
 print("Valor Total: ",macas * 0.25)
