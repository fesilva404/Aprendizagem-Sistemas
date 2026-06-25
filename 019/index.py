import tkinter as tk


def main():
    janela = tk.Tk()
    janela.title("Quiz Arraiá do Saber")
    janela.geometry("600x450")
    janela.resizable(False, False)

    perguntas = [
        {
            "texto": "Pergunta 1: Qual dia do mês de junho que se comemora dia de São João",
            "opcoes": {
                "a": "12 de junho",
                "b": "20 de junho",
                "c": "24 de junho",
                "d": "18 de junho",
            },
            "correta": "c",
            "mensagem": "É o dia que celebra o nascimento de São João Batista, um dos santos mais importantes da Igreja Católica",
        },
        {
            "texto": "Pergunta 2: Qual é o alimento mais típico das festas juninas",
            "opcoes": {
                "a": "milho",
                "b": "lasanha",
                "c": "feijoada",
                "d": "panelada",
            },
            "correta": "a",
            "mensagem": "O milho é o principal alimento, pois serve de base para criação de outros alimentos da festa",
        },
        {
            "texto": "Pergunta 3: Qual a principal dança praticada durante as festas",
            "opcoes": {
                "a": "forró",
                "b": "quadrilha",
                "c": "salsa",
                "d": "samba",
            },
            "correta": "b",
            "mensagem": "A quadrilha é a principal dança das festas juninas, um estilo de dança folclórica popular no brasil",
        },
    ]

    # Estado do quiz
    indice = {"valor": 0}
    pontuacao = {"valor": 0}

    # UI
    titulo = tk.Label(janela, text="Olá, Bem vindo ao Quiz Arraiá do saber", font=("Arial", 14, "bold"))
    titulo.pack(pady=10)

    status = tk.Label(janela, text="Iniciando as perguntas...", font=("Arial", 11))
    status.pack(pady=5)

    conteudo = tk.Label(janela, text="", font=("Arial", 12), wraplength=560, justify="left")
    conteudo.pack(pady=10)

    op_frame = tk.Frame(janela)
    op_frame.pack(pady=5)

    feedback = tk.Label(janela, text="", font=("Arial", 11), fg="darkgreen", wraplength=560, justify="left")
    feedback.pack(pady=10)

    # Botão Próxima (avança quando o usuário clicar)
    botao_proxima = tk.Button(janela, text="Próxima", state="disabled")
    botao_proxima.pack(pady=8)

    # Botões de opções
    botao_opcoes = {}

    def atualizar_botoes():
        for w in op_frame.winfo_children():
            w.destroy()

        p = perguntas[indice["valor"]]

        for letra, texto in p["opcoes"].items():
            def handler(l=letra):
                responder(l)

            b = tk.Button(
                op_frame,
                text=f"{letra}) {texto}",
                width=22,
                height=2,
                bg="#444",
                fg="white",
                activebackground="#666",
                activeforeground="white",
                command=handler,
            )
            b.grid(row=(ord(letra) - ord('a')) // 2, column=(ord(letra) - ord('a')) % 2, padx=8, pady=8)
            botao_opcoes[letra] = b

    def responder(escolha):
        p = perguntas[indice["valor"]]
        correta = p["correta"]

        # bloquear cliques
        for b in botao_opcoes.values():
            b.config(state="disabled")

        if escolha == correta:
            pontuacao["valor"] += 1
            feedback.config(text="Correto\n" + p["mensagem"], fg="darkgreen")
            status.config(text=f"Pergunta {indice['valor'] + 1} respondida corretamente")
        else:
            mensagem_certa = f"Item {correta} era o certo"
            feedback.config(text=f"Incorreto\n{mensagem_certa}\n\n{p['mensagem']}", fg="#8B0000")
            status.config(text=f"Pergunta {indice['valor'] + 1} respondida incorretamente")

        botao_proxima.config(state="normal")

    def avancar():
        indice["valor"] += 1

        if indice["valor"] >= len(perguntas):
            conteudo.config(text="Fim do quiz! Obrigado por participar.")
            status.config(text="Quiz concluído")
            feedback.config(text=f"Pontuação final: {pontuacao['valor']} pontos", fg="black")
            for w in op_frame.winfo_children():
                w.destroy()
            botao_proxima.config(state="disabled")
            return

        conteudo.config(text=perguntas[indice["valor"]]["texto"])
        feedback.config(text="", fg="darkgreen")
        status.config(text="Escolha uma alternativa")
        botao_proxima.config(state="disabled")
        atualizar_botoes()

    botao_proxima.config(command=avancar)

    # Inicialização
    conteudo.config(text=perguntas[indice["valor"]]["texto"])
    atualizar_botoes()

    # Botão Reiniciar
    def reiniciar():
        indice["valor"] = 0
        pontuacao["valor"] = 0
        status.config(text="Iniciando as perguntas...")
        feedback.config(text="", fg="darkgreen")
        conteudo.config(text=perguntas[indice["valor"]]["texto"])
        botao_proxima.config(state="disabled")
        atualizar_botoes()

    reiniciar_btn = tk.Button(janela, text="Reiniciar", command=reiniciar)
    reiniciar_btn.pack(pady=10)

    janela.mainloop()


if __name__ == "__main__":
    main()

