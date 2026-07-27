import sqlite3
conexao = sqlite3.connect('exemplo2.db')
cursor = conexao.cursor()
# cursor.execute('''
# CREATE TABLE Alunos (
#     ID INTEGER PRIMARY KEY,
#     Nome TEXT NOT NULL,
#     Idade INTEGER,
#     Curso TEXT
#     )
# ''')
# conexao.commit()

cursor.execute('''
INSERT INTO Alunos (Nome,Idade,Curso)
VALUES  ('Anna', 18,'Engenharia'),
        ('Clara', 18, 'Eng_AERO')
        ''')
conexao.commit()

def inserir_dados(nome, idade, curso);
    cursor.execute('''
    INSERT INTO Alunos (Nome, Idade, Curso)
    VALUES (?,?,?)''', (nome,idade,curso))  
    conexao.commit

Nome = str(input("Digite o nome: "))
idade = int(input("Digite a idade: "))
Curso = str(input("Digite o curso: "))
inserir_dados(Nome,idade,Curso)