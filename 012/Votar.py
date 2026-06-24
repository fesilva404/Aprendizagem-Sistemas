while True:
 idade = int(input("Digite sua idade: "))
 if  18 <= idade <= 69:
  print("Voto obrigatorio")
 elif 16 <= idade <= 17:
  print("Voto facultativo!, Voto obrigaorio em:", 2026 - idade + 18)
 elif 69 <= idade <= 130:
  print("Voto facultativo!, Obrigado pela contribuiçao e compromisso!")
 elif 0 <= idade <= 15:
  print(" nao pode votar!, podera votar facultativo em:",2026 - idade + 16)
  
 else:
  idade < 0 or idade > 130
  print("idade invalida")
  