import random
numero_secreto = random.randint(1,100)
print("Diite um numero inteiro positivo entre 1 e 10")
acertou = False
while not acertou:
    palpite = int(input("Digite o seu palpite: "))
    if palpite < numero_secreto:
        print("o numero é maior. tenten novamente!")
    elif palpite > numero_secreto:
        print("seu numero e menor. Tente novamente!")
    else:
        print("parabens! voce acertou o numero!")
        acertou = True