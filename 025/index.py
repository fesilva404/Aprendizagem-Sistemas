
def ler_arquivo():
    arquivo = open('exemploDois.txt','r', encoding="utf-8")
    conteudo = arquivo.read()
    print(conteudo)


def escrever_arquivo():
    pass

def add_conteudo_arquivo():
    arquivo = open('exemploDois.txt','a', encoding="utf-8")
    arquivo.write("morcego\n")
    arquivo.close()

ler_arquivo()
add_conteudo_arquivo()
ler_arquivo()