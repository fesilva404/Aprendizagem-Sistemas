/*
 * OrderService.java
 * Demonstração de lógica de cálculo/validação em Java.
 * Não integra automaticamente com o site (sem servidor), mas serve como base para um back-end.
 */

import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class OrderService {

    public static class MenuItem {
        public final String key;
        public final String label;
        public final BigDecimal price;

        public MenuItem(String key, String label, BigDecimal price) {
            this.key = key;
            this.label = label;
            this.price = price;
        }
    }

    public static class Retirada {
        public final String key;
        public final String label;
        public final BigDecimal fee;

        public Retirada(String key, String label, BigDecimal fee) {
            this.key = key;
            this.label = label;
            this.fee = fee;
        }
    }

    public static class Pedido {
        public final String nome;
        public final String telefone;
        public final String itemKey;
        public final String retiradaKey;
        public final String itemLabel;
        public final String retiradaLabel;
        public final String observacoes;
        public final BigDecimal total;
        public final long createdAt;

        public Pedido(String nome,
                       String telefone,
                       String itemKey,
                       String retiradaKey,
                       String itemLabel,
                       String retiradaLabel,
                       String observacoes,
                       BigDecimal total,
                       long createdAt) {
            this.nome = nome;
            this.telefone = telefone;
            this.itemKey = itemKey;
            this.retiradaKey = retiradaKey;
            this.itemLabel = itemLabel;
            this.retiradaLabel = retiradaLabel;
            this.observacoes = observacoes;
            this.total = total;
            this.createdAt = createdAt;
        }
    }

    // "Banco" em memória (exemplo)
    private final Map<String, MenuItem> menu = new HashMap<>();
    private final Map<String, Retirada> retirada = new HashMap<>();

    // Exemplo de "persistência lógica"
    private final Map<Long, Pedido> pedidosPersistidos = new HashMap<>();

    public OrderService() {
        menu.put("capuccino", new MenuItem("capuccino", "Capuccino", new BigDecimal("12.00")));
        menu.put("espresso", new MenuItem("espresso", "Espresso", new BigDecimal("7.00")));
        menu.put("americano", new MenuItem("americano", "Americano", new BigDecimal("9.00")));
        menu.put("pao-de-queijo", new MenuItem("pao-de-queijo", "Pão de queijo", new BigDecimal("18.00")));
        menu.put("brownie", new MenuItem("brownie", "Brownie com calda", new BigDecimal("19.00")));

        retirada.put("balcao", new Retirada("balcao", "No balcão", new BigDecimal("0.00")));
        retirada.put("retirada", new Retirada("retirada", "Retirada", new BigDecimal("0.00")));
        retirada.put("entrega", new Retirada("entrega", "Entrega (taxa fixa)", new BigDecimal("6.50")));
    }

    public Pedido criarPedido(String nome,
                                String telefone,
                                String itemKey,
                                String retiradaKey,
                                String observacoes) {

        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome é obrigatório.");
        }
        if (telefone == null || telefone.trim().isEmpty()) {
            throw new IllegalArgumentException("Telefone é obrigatório.");
        }
        if (itemKey == null || !menu.containsKey(itemKey)) {
            throw new IllegalArgumentException("Item inválido.");
        }
        if (retiradaKey == null || !retirada.containsKey(retiradaKey)) {
            throw new IllegalArgumentException("Tipo de retirada inválido.");
        }

        MenuItem item = menu.get(itemKey);
        Retirada r = retirada.get(retiradaKey);

        BigDecimal total = item.price.add(r.fee);
        long createdAt = Instant.now().toEpochMilli();

        Pedido pedido = new Pedido(
                nome.trim(),
                telefone.trim(),
                item.key,
                r.key,
                item.label,
                r.label,
                (observacoes == null ? "" : observacoes.trim()),
                total,
                createdAt
        );

        // Persistência lógica (exemplo)
        pedidosPersistidos.put(pedido.createdAt, pedido);

        return pedido;
    }

    public Pedido getPedidoPersistido(long createdAt) {
        return pedidosPersistidos.get(createdAt);
    }

    public static void main(String[] args) {
        OrderService service = new OrderService();

        Pedido p = service.criarPedido(
                "Maria",
                "(11) 99999-9999",
                "capuccino",
                "entrega",
                "Sem canela"
        );

        System.out.println("Pedido criado: " + p.itemLabel + " | total=" + p.total);
    }
}

