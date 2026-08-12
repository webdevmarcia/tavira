export default function Formacao () {
  const faq = [
    {
      pergunta: "Peixes assados a dose",
      resposta:
        "Os peixes assados a dose são: sardinhas (7 unidades), salmão, robalo (pequeno), massacotes (3 ou 4 unidades, dependendo do tamanho), peixe-espada, besugo, dourada, carapau (3 ou 4 dependendo do tamanho), atum. Todos esses peixes trazem de acompanhamento batata cozida e migas. Não fazemos trocas nem substituições, se a pessoa quiser salada ou legumes, paga esses itens a parte. Temos sempre que levar esses peixes da montra para a cozinha."
    },
    {
      pergunta: "Peixes ao peso",
      resposta:
        "Temos sempre que pesar esses peixes: linguado, robalo (os grandes), pregado, salmonete, corvina, garoupa, cherne, sargo, dourada (as grandes), cantaril, imperador, ovas e lulas. Todos esses itens trazem batatas cozidas e migas, excepto as ovas e lulas, que só trazem um bocadinho de batata, coentros e cebola. Temos sempre que levar esses itens a cozinha."
    },
    {
      pergunta: "Tachos",
      resposta:
        "Todos os tachos trazem camarão, os ensopados trazem sempre pão frito. A massa/arroz de sapateira traz a sapateira partida. A feijoada de gambas traz arroz, "
    },
    {
      pergunta: "Pratos especiais",
      resposta:
        "Caril de camarão traz arroz, Bacalhau a Tavira é frito e traz batata doce, o Bacalhau Assado é assado e traz pimentos, o atum de cebolada traz batata frita.  "
    },
    {
      pergunta: "Carnes",
      resposta:
        "Bife da Vazia, plumas de porco e t-bone são grelhados, trazem batata frita e salada. O prego do lombo temos sempre que perguntar ao cliente se é no pão ou no prato, e depois escrever nos comentários se é no pão ou no prato. Não há bitoque de vaca, só de porco. O bitoque traz a carne, ovo estrelado, arroz e batata frita. A picanha traz a carne, fruta, salada, arroz, feijão e batata frita. Os bifinhos de frango trazem batata frita e arroz. O bife a casa traz molho de natas, batata frita, salada e camarão. Temos sempre que perguntar ao cliente o ponto da carne (médio, mal ou bem passado) e colocar nos comentários. "
    },
    {
      pergunta: "Mariscada",
      resposta:
        "A mariscada temos a quente e a fria. A fria traz uma sapateira recheada, camarões nc (uns 7 ou 8), e ostras (2). A quente traz camarão, ameijoas e ligueirão. Temos que levar a cozinha uma sapateira pequena, 6 ou 7 camarões nc e 2 ostras. Se pedirem ligueirão, temos que perguntar se é natural ou a Bulhao Pato e escrever nos comentários. Se pedirem sapateira, temos que perguntar se é natural ou recheada e escrevemos nos comentários."
    }
  ];

  return (
    <section id="FAQ" className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-black text-3xl md:text-4xl font-bold">FAQ — Comidas & Pratos</h2>
        <p className="mt-2 text-lg text-gray-500">
          Perguntas frequentes sobre os pratos do restaurante
        </p>
      </div>

      <div className="space-y-4">
        {faq.map((item, index) => (
          <details
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <summary className="cursor-pointer font-semibold text-lg text-black">
              {item.pergunta}
            </summary>
            <p className="mt-2 text-gray-700">{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
