print("_______salario_______")
GanhoHora = float(input("Valor ganho por hora: "))
horas_trabalhadas = int(input("Digite suas horas trabalhadas: "))
print("seu ganho bruto: ", GanhoHora * horas_trabalhadas * 30 )
salario =  GanhoHora * horas_trabalhadas * 30
print("desconto INSS: ", salario * 0.08)
print("desconto SINDICATO: ", salario * 0.05)
print("desconto IR: ", salario * 0.11)
print("salario final: ", salario - (salario * 0.24))
