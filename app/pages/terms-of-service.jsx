import Head from 'next/head'
import { retrieveUser } from '../logic'
import { Header, Footer, FlexColSection } from '../components'
import { verifyTokenAndRedirect } from '../helpers'

export default function TermsOfService({ user }) {
    return <>
        <Head>
            <title>Terms of service | PitchUs</title>
        </Head>

        <Header className="pb-2" title="Terms of service" />

        <FlexColSection className="py-4 flex-1 overflow-y-auto items-center gap-4" >
            <article className="px-4 flex flex-col gap-2">
                <p>El presente documento enumera los Términos y Condiciones del servicio ofrecido por el sitio Web pitch-us.vercel.app (El Sitio) a toda persona (el Visitante) que navegue por las páginas del mencionado sitio, así como a todo usuario registrado al sitio (el Usuario). Entiéndase por Servicio la consulta de toda página HTML perteneciente al dominio &quotpitch-us.vercel.app&quot (y sus respectivos sub-dominios) así como las herramientas de publicación de contenidos e intercambio de mensajes ofrecidas a todo usuario registrado. Todo Visitante deberá someterse a los Términos y Condiciones aquí enumerados. El no cumplimiento de dicha obligación podrá resultar en la cancelación pura y simple de la cuenta del Usuario.</p>

                <h2>Términos y Condiciones:</h2>

                <p>1. El Visitante se compromete a utilizar el Sitio para fines personales y no comerciales. Toda persona menor de 13 años deberá contar con la autorización de sus padres o tutores legales para visitar y/o registrarse al Sitio.</p>

                <p>2. Al registrarse al Sitio, el Usuario se compromete a proporcionar información verídica sobre su perfil y estará obligado a mantener dicha información actualizada. Queda estrictamente prohibida la usurpación de identidad. Todo usuario que incurra en dicha infracción será excluido inmediatamente del Sitio.</p>

                <p>3. El Usuario se compromete a publicar en el Sitio únicamente contenidos de su autoría. Al enviar contenido, como por ejemplo transcripciones para guitarra, el Usuario da licencia al Sitio para publicar dicho contenido a través de sus páginas de manera ilimitada. En ningún momento el Sitio exigirá exclusividad por parte del Usuario: la propiedad intelectual del contenido enviado permanecerá en manos del Usuario, quien será libre de publicar sus contenidos en cualquier otro medio, incluidos otros sitios web. El Usuario es libre de retirar del Sitio los contenidos de su autoría en cualquier momento, sin requerir bajo ninguna circunstancia la autorización del Sitio.</p>

                <p>4. El Usuario se compromete a no enviar ningún tipo de contenido que viole las leyes vigentes en su país de residencia. El usuario se compromete a no publicar material ofensivo incluyendo, pero no limitado a: imágenes, video, texto o ficheros de audio con carácter pornográfico, demasiado violento o que pueda causar daño psicológico a otros Visitantes (en especial a los menores de edad). Igualmente se prohíbe la publicación de contenidos que inciten al odio o la violencia, anuncios que promuevan la compra/venta de armamento, explosivos, fármacos, bebidas alcohólicas o cualquier otra sustancia controlada, que promuevan la prostitución, artículos robados, de contrabando o cuya procedencia no pueda ser determinada, contenidos que promuevan programas que faciliten la piratería informática, enlaces hacía sitios o programas que instalen virus o cualquier otro programa informático que pueda dañar el ordenador (computadora) de otros Visitantes. Queda prohibida la utilización de las herramientas de publicación de contenidos del Sitio para promover rifas, sorteos o cualquier otro tipo de concurso con fines lucrativos que no cuenten con las autorizaciones legales correspondientes.</p>

                <p>5. Como parte del Servicio, el Usuario tiene la posibilidad de enviar mensajes en los foros y de publicar comentarios en las páginas de interpretaciones. El Sitio no se hace responsable del contenido de dichos textos, pero se compromete a eliminarlos en cuanto una infracción a los presentes Términos y Condiciones le sea señalada. Todo comportamiento que sea considerado como abusivo o que viole los presentes Términos y Condiciones podrá resultar en la cancelación de la cuenta del Usuario.</p>

                <p>6. Queda estrictamente prohibida la copia de los contenidos publicados en el Sitio. En lo que se refiere a las interpretaciones para guitarra, estos contenidos son trabajo propio de sus intérpretes y representan su interpretación personal de las canciones. Las interpretaciones contenidas en el Sitio son para exclusivo uso privado, por lo que se prohíbe su reproducción o retransmisión, así como su uso para fines comerciales.</p>

                <p>7. El Sitio no se hace responsable de las consecuencias que la publicación de ciertos contenidos por parte del Usuario pueda causarle a él o a terceras personas. No obstante, el Sitio se compromete a eliminar inmediatamente todo contenido que sea considerado como abusivo o que no respete los Términos y Condiciones enumerados en este documento.</p>

                <p>8. La dirección de correo electrónico proporcionada por el Usuario es considerada por el Sitio como el único medio de comunicación válido con el Usuario. El Sitio se compromete a no comunicar la dirección de correo electrónico de los Usuarios, a menos que estos incluyan dicha información en el material que ellos mismos publican a través del sitio. En ningún momento el Sitio enviará mensajes a sus Usuarios para ningún otro tema que no esté relacionado con la temática o el funcionamiento del Sitio.</p>

                <p>9. El Sitio no utilizará el contenido enviado por los Usuarios para otros fines que no sean la publicación de los mismos en las páginas Web del Sitio. El Sitio no podrá ser considerado responsable por la eventual pérdida o eliminación del material enviado. Se recomienda al Usuario guardar siempre consigo una copia de los contenidos enviados, con el fin de restituirlos en caso de eliminación accidental.</p>

                <p>10. El Usuario no utilizará las facilidades que ofrece el Sitio como &quotrepositorio&quot, es decir, que sirvan como almacenamiento de datos para acceder a ellos de cualquier otra forma que no sea a través de las páginas del Sitio. De igual manera, queda prohibido el &quotacceso remoto&quot a los contenidos del sitio, definiéndose &quotacceso remoto&quot como la inclusión de URIs (Universal Remote Identifiers) que apunten directamente a contenidos internos del Sitio, como imágenes y/o archivos de audio, desde páginas web ajenas al Sitio.</p>

                <p>11. El Sitio se reserva el derecho de cancelar la cuenta del Usuario sin previo aviso y sin la obligación de dar explicaciones al Usuario excluido sobre las razones que llevaron a la cancelación de su cuenta. Dicha acción podrá darse esencialmente como consecuencia del no respeto a los presentes Términos y Condiciones.</p>

                <p>12. El Visitante acepta el Servicio &quottal cual es&quot. El Sitio se compromete a mantener altos niveles de disponibilidad, pero en ningún momento podrá ser juzgado responsable de cualquier interrupción, ya sea temporal o permanente, del servicio. Los responsables del Sitio se reservan el derecho de clausurar parcial o totalmente el Sitio por razones técnicas, económicas o legales, sin tener obligación de explicar dichas razones a los Usuarios del Sitio.</p>
            </article>
        </FlexColSection>

        <Footer user={user} ></Footer>
    </>
}

export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (token) {
        const user = await retrieveUser(token)

        return { props: { user } }

    } else return { props: {} }
}