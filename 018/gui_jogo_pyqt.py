import random
import sys

from PyQt5.QtWidgets import (
    QApplication,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QMainWindow,
    QMessageBox,
    QPushButton,
    QVBoxLayout,
    QWidget,
)


class JogoAdivinhacao(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Jogo - Adivinhe o Número")
        self.numero_secreto = None

        self._init_ui()
        self.novo_jogo()

    def _init_ui(self):
        central = QWidget()
        self.setCentralWidget(central)

        # Mensagem
        self.lbl_status = QLabel("Digite um número entre 1 e 100")
        self.lbl_status.setWordWrap(True)

        # Input
        self.input_palpite = QLineEdit()
        self.input_palpite.setPlaceholderText("Seu palpite (inteiro)")
        self.input_palpite.returnPressed.connect(self.acao_adivinhar)

        # Botões
        self.btn_adivinhar = QPushButton("Adivinhar")
        self.btn_adivinhar.clicked.connect(self.acao_adivinhar)

        self.btn_novo = QPushButton("Novo jogo")
        self.btn_novo.clicked.connect(self.novo_jogo)

        # Layout
        layout = QVBoxLayout()
        layout.addWidget(self.lbl_status)

        row = QHBoxLayout()
        row.addWidget(self.input_palpite)
        layout.addLayout(row)

        row_btn = QHBoxLayout()
        row_btn.addWidget(self.btn_adivinhar)
        row_btn.addWidget(self.btn_novo)
        layout.addLayout(row_btn)

        central.setLayout(layout)

        # Estado inicial
        self.palpite_vencido = False

    def novo_jogo(self):
        self.numero_secreto = random.randint(1, 100)
        self.palpite_vencido = False
        self.input_palpite.clear()
        self.input_palpite.setEnabled(True)
        self.btn_adivinhar.setEnabled(True)
        self.lbl_status.setText("Novo jogo! Digite um número entre 1 e 100")
        self.input_palpite.setFocus()

    def acao_adivinhar(self):
        if self.palpite_vencido:
            return

        texto = self.input_palpite.text().strip()
        if not texto:
            QMessageBox.warning(self, "Entrada inválida", "Digite um número inteiro.")
            return

        try:
            palpite = int(texto)
        except ValueError:
            QMessageBox.warning(self, "Entrada inválida", "O palpite deve ser um número inteiro.")
            return

        if palpite < 1 or palpite > 100:
            QMessageBox.warning(self, "Fora do intervalo", "Digite um número entre 1 e 100.")
            return

        # Lógica do jogo (mesma ideia do jogo.py)
        if palpite < self.numero_secreto:
            self.lbl_status.setText("O número é MAIOR. Tente novamente!")
            return
        if palpite > self.numero_secreto:
            self.lbl_status.setText("O número é MENOR. Tente novamente!")
            return

        self.palpite_vencido = True
        self.lbl_status.setText("Parabéns! Você acertou o número!")
        self.input_palpite.setEnabled(False)
        self.btn_adivinhar.setEnabled(False)


def main():
    app = QApplication(sys.argv)
    win = JogoAdivinhacao()
    win.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()

