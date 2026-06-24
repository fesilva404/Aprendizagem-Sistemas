print("BEM VINDO A IRIS")
combustivel = int(input("Quanto de combustivel esta disponivel: "))
atmosfera = str(input("A atmosfera e respiravel: ")).strip
traje = int(input("Digite o nivel de integridade: "))
if combustivel >= 15 and (atmosfera == "sim" or atmosfera == "Sim" or atmosfera == "S" or atmosfera == "s" and traje == 100):
    print("Iniciando processo de pouso de emergencia")
else:
    print("ERROR IMPOSSIVEL REALIZAR PROCESSO DE POUSO EMERGENCIAL")