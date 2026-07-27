pessoa = {"Nome": "Clara",
          "idade":"18",
          "prof": "ADM",
          "cidade": "For",
          "email": "Cg331@gmail.com",
          "endereço": "rua marivalda piris 672",
          }

pessoaDois = {"Nome": "Luana",
              "idade": "18",
              "cidade": "Petrolina",
              "Prof": "Caixa",
              "Email": "luaxiwe16@hotmail.com",
               "endereço": "Rua sakura bianco 566", }

pessoaTres = {"Nome ": "pedro",
              "idade": "19",
              "cidade":"Fortaleza",
              "prof":"Atleta",
              "Email":"pedrolima356@gmail.com",
              "endereço":"Benivides alencar 991",}

for chave_apontada in pessoaTres:
 print(pessoaTres[chave_apontada])
print("-----------------------------------") 
for chave_apontada in pessoaDois:
    print(pessoaDois[chave_apontada])
print("-----------------------------------")
for chave_apontada in pessoa:
    print(pessoa[chave_apontada])