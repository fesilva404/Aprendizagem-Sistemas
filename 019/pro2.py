print('Olá, Bem vindo ao Quiz Arraiá do saber')
print('Inciando as perguntas')
ponto = 0
print('Pergunta 1: Qual dia do mês de junho que se comemora dia de São João')
print('a)(12 de junho')
print('b)(20 de junho')
print('c)(24 de junho')
print('d)(18 de junho')
per1 = input('Digite o item correto:')
if per1 == 'c':
    print('Correto')
    print('É o dia que celebra o nascimento de São João Batista, um dos santos mais importantes da Igreja Católica')
    ponto += 1
else:
    print('Incorreto')
    print('Item c era o certo ')

print('Pergunta 2: Qual é o alimento mais típico das festas juninas')
print('a)(milho')
print('b)(lasanha')
print('c)(feijoada')
print('d)(panelada')
per2 = input('Digite o item correto:')
if per2 == 'a':
    print('Correto')
    ponto += 1
    print('O milho é o principal alimento, pois serve de base para criação de outros alimentos da festa ')
else:
        print('Incorreto')
        print('Item a era o certo')
print('Pergunta 3: Qual a principal dança praticada durante as festas')
print('a)(forró')
print('b)(quadrilha')
print('c)(salsa')
print('d)(samba')
per3 = input('Digite o item correto:')
if per3 == 'b':
    print('Correto')
    ponto += 1
    print('A quadrilha é a principal dança das festas juninas, um estilo de dança folclórica popular no brasil')
else:
    print('correto')
    print('Item b era o certo')

print(ponto)
