def arquivo_text():
    nome_arquivo = input("Digite o nome do arquivo de texto: ")
    vogais = "!@#$%¨&*()_+{}^`?"""
    total_vogais = 0
    try:
        with open(nome_arquivo,'r', encoding='utf-8') as arquivo:
            conteudo = arquivo.read().lower()
            for caractere in conteudo:
                if caractere in vogais:
                    total_vogais += 1
        print(f"O arquivo possui {total_vogais} caractere.")

    except FileExistsError:
        print("Error: o arquivo nao foi encontrado. Verifique o nome.")
arquivo_text()