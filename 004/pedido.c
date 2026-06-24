/*
 * pedido.c
 * Demonstração em C: validação simples de entrada e cálculo do total.
 * Compilar (exemplo):
 *   gcc pedido.c -o pedido.exe
 */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

static int equals(const char* a, const char* b) {
    return a && b && strcmp(a, b) == 0;
}

int main() {
    char nome[128];
    char telefone[64];
    char item[64];
    char retirada[32];
    char obs[256];

    double preco_item = 0.0;
    double taxa = 0.0;

    printf("Digite seu nome: ");
    if (!fgets(nome, sizeof(nome), stdin)) return 1;
    nome[strcspn(nome, "\n")] = 0;

    printf("Digite seu telefone: ");
    if (!fgets(telefone, sizeof(telefone), stdin)) return 1;
    telefone[strcspn(telefone, "\n")] = 0;

    printf("Escolha o item (capuccino|espresso|americano|pao-de-queijo|brownie): ");
    if (!fgets(item, sizeof(item), stdin)) return 1;
    item[strcspn(item, "\n")] = 0;

    printf("Escolha retirada (balcao|retirada|entrega): ");
    if (!fgets(retirada, sizeof(retirada), stdin)) return 1;
    retirada[strcspn(retirada, "\n")] = 0;

    printf("Observacoes (opcional, pode ser vazio): ");
    if (!fgets(obs, sizeof(obs), stdin)) obs[0] = '\0';
    obs[strcspn(obs, "\n")] = 0;

    if (strlen(nome) == 0 || strlen(telefone) == 0 || strlen(item) == 0 || strlen(retirada) == 0) {
        printf("ERRO: preencha nome, telefone, item e retirada.\n");
        return 1;
    }

    // preço do menu
    if (equals(item, "capuccino")) preco_item = 12.00;
    else if (equals(item, "espresso")) preco_item = 7.00;
    else if (equals(item, "americano")) preco_item = 9.00;
    else if (equals(item, "pao-de-queijo")) preco_item = 18.00;
    else if (equals(item, "brownie")) preco_item = 19.00;
    else {
        printf("ERRO: item invalido.\n");
        return 1;
    }

    // taxa por tipo de retirada
    if (equals(retirada, "balcao")) taxa = 0.00;
    else if (equals(retirada, "retirada")) taxa = 0.00;
    else if (equals(retirada, "entrega")) taxa = 6.50;
    else {
        printf("ERRO: tipo de retirada invalido.\n");
        return 1;
    }

    double total = preco_item + taxa;

    printf("\n--- COMPROVANTE (demo) ---\n");
    printf("Cliente: %s\n", nome);
    printf("Telefone: %s\n", telefone);
    printf("Item: %s (R$ %.2f)\n", item, preco_item);
    printf("Retirada: %s (taxa R$ %.2f)\n", retirada, taxa);
    printf("Total: R$ %.2f\n", total);
    if (strlen(obs) > 0) printf("Obs: %s\n", obs);

    return 0;
}

