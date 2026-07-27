import json

def cadastrar_animal():
   
    novo_animal = {}
    novo_animal["nome"] = input("Digite o nome do animal: ")
    novo_animal["idade"] = int(input("Digite a idade do animal: ")) 
    novo_animal["especie"] = input("Digite a especie do animal: ")
    #Associa CPF aos Dados do Cliente no banco global
    print(f"animais {novo_animal['nome']} cadastrado com sucesso!")
    animais.append(novo_animal)

def buscar_animal(animal_busca):
    if animal_busca in animais:
        dados = animais[animal_busca]
        print(f"Animal encontrado: {dados['nome']}")
        return dados
    else:
        print("Cliente não encontrado.")
        return False



animais = []

with open("aluno.json","w") as arquivo:
    json.dump(animais,arquivo,indent=4)

