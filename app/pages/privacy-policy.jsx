import Head from 'next/head'
import Link from 'next/link'
import { retrieveUser } from '../logic'
import { Header, Footer, FlexColSection } from '../components'
import { verifyTokenAndRedirect } from '../helpers'

export default function PrivacyPolicy({ user }) {
    return <>
        <Head>
            <title>Privacy Policy | PitchUs</title>
        </Head>

        <Header className="pb-2" title="Privacy Policy" />

        <FlexColSection className="flex-1 overflow-y-auto items-center gap-4" >
            <article className="py-4 flex flex-col gap-2">
                <p className="px-4">pitch-us.vercel.app (en adelante “el sitio”), en cumplimiento a lo que establece la ley
                    de protección de datos personales hace del conocimiento que el sitio no almacena datos personales de sus visitantes, a menos que estos decidan inscribirse como usuarios registrados (en adelante “usuarios”) lo que permite acceder a servicios adicionales y les da la posibilidad de aportar contenidos conforme a las reglas establecidas por nuestros <Link href="/terms-of-service"><a className="text-blue-600 underline">Términos y Condiciones</a></Link>. En dicho caso, la única información requerida es el nombre de usuario, ligado a una dirección de correo electrónico y una contraseña. El sitio se compromete a mantener la privacidad de dicha información utilizando todos los medios técnicos a su alcance.</p>

                <p className="px-4">Adicionalmente, el usuario puede proporcionar datos personales, como nombre, fecha de nacimiento y lugar de residencia. Si dicha información es proporcionada aparecerá públicamente en el sitio, por lo que es responsabilidad del usuario decidir si comunica esta información o no.</p>

                <p className="px-4">El sitio se compromete a proteger y a no compartir los datos personales de sus usuarios con terceros, excepto en el caso de un requerimiento legal. En especial, las direcciones de correo de los usuarios registrados sólo son utilizadas para comunicarse con el usuario de manera personal. Esta base de direcciones nunca será utilizada para enviar correos masivos de promoción y/o publicidad.</p>

                <p className="px-4">Como la gran mayoría de sitios web, pitch-us.vercel.app utiliza cookies. Esta página explica qué son exactamente las cookies; qué tipo de cookies utilizamos y para qué; y cómo puede ejercer su derecho para configurar su navegador y desestimar el uso de cualquiera de ellas.</p>

                <p className="px-4">Al acceder a este sitio web, y de acuerdo a la normativa vigente en materia de protección de datos, le informamos del uso de cookies, dándole la opción de aceptarlas expresamente y de obtener más información a través del contenido de esta página.</p>

                <p className="px-4">Debe saber que, en el caso de continuar navegando, estará prestando su consentimiento para el empleo de estas cookies. Pero, en cualquier momento, podrá cambiar de opinión y bloquear su utilización a través del navegador.</p>

                <p className="px-4">Para su tranquilidad, este sitio web cumple con lo estipulado en la normativa vigente en relación con el uso de las cookies y sus datos personales.</p>

                <p className="px-4">Debe saber, que si decide bloquear algunas cookies, este sitio web puede no funcionar correctamente, afectando la experiencia de usuario.</p>

                <h2 className="px-4 font-medium">¿Qué es una cookie?</h2>

                <p className="px-4">Una  cookie es un pequeño fichero de datos que un sitio web solicita al navegador que guarde en la computadora o en el dispositivo móvil del usuario. Gracias a esa cookie, el sitio web puede &quotrecordar&quot las acciones o preferencias del usuario con el paso del tiempo. La mayoría de los navegadores de internet admiten cookies; pero los usuarios pueden configurarlos para que no admitan determinados tipos de cookies o cookies específicas. Los usuarios también pueden eliminar las cookies en cualquier momento.</p>

                <p className="px-4">Las  cookies  permiten a un sitio web, entre otras cosas, almacenar y recuperar información sobre sus hábitos de navegación o de su equipo, y dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocerle.</p>

                <p className="px-4">El navegador del usuario memoriza cookies en el disco duro ocupando un espacio de memoria mínimo y no perjudicando a la computadora. Las cookies no contienen ninguna clase de información personal específica, y la mayoría de las mismas se borran al finalizar la sesión de navegador (las denominadas cookies de sesión).</p>

                <p className="px-4">La mayoría de los navegadores aceptan como estándar a las cookies y, con independencia de las mismas, permiten o impiden en los ajustes de seguridad las cookies temporales o memorizadas.</p>

                <p className="px-4">Las cookies se asocian al navegador, no a la persona, por lo que no suelen almacenar información sensible sobre usted como tarjetas de crédito o datos bancarios, fotografías o información personal, etc. Los datos que guardan son de carácter técnico, estadísticos, preferencias personales, personalización de contenidos, etc.</p>

                <h2 className="px-4 font-medium">¿Qué tipos de cookies utilizamos?</h2>

                <h3 className="px-4 font-medium">Cookies propias</h3>

                <p className="px-4">Son aquellas que se envían a su equipo desde nuestro propio servidor y pueden ser de dos tipos:</p>

                <ul className="pl-4">
                    <li>- Cookies técnicas: Necesarias para la navegación y el buen funcionamiento de nuestro sitio web. Permiten por ejemplo, mantener los datos de sesión, acceder a partes de acceso restringido y son necesarias para poder aportar contenidos.</li>
                    <li>- Cookies de personalización: Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serían el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde dónde accede al servicio, etc.</li>
                </ul>

                <h2 className="px-4 font-medium">¿Cómo puedo configurar las Cookies o deshabilitarlas?</h2>

                <p className="px-4">Para modificar los parámetros de privacidad con respecto a este sitio, click aquí.</p>

                <p className="px-4">Puede aceptar, bloquear o eliminar las Cookies instaladas en su equipo mediante la configuración de las opciones del navegador. En los siguientes enlaces encontrará instrucciones para habilitar o deshabilitar las Cookies en los navegadores más comunes:</p>

                <ul className="pl-4">
                    <li>- Firefox http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-Cookies-que-los-sitios-web</li>
                    <li>- Safari http://support.apple.com/kb/HT1677?viewlocale=es_ES/</li>
                    <li>- Google Chrome https://support.google.com/chrome/answer/95647?hl=es</li>
                    <li>- Otros navegadores Consulte la documentación del navegador que tenga instalado.</li>
                </ul>

                <p className="px-4">Esta Política de Cookies podría modificarse en cualquier momento para adaptarse a novedades normativas o cambios en nuestros servicios, siendo vigente la que en cada momento se encuentre publicada en esta página.</p>

                <p className="px-4">En relación con el tratamiento de sus datos personales, puede ponerse en contacto con nosotros en cualquier momento para:</p>

                <ul className="pl-4">
                    <li>- Acceder a sus datos personales</li>
                    <li>- Rectificar sus datos personales que sean inexactos o estén incompletos</li>
                    <li>- Suprimir su cuenta en el sitio o cualquiera de sus datos personales</li>
                    <li>- Oponerse al tratamiento de sus datos personales.</li>
                    <li>- Derecho a no dar o retirar el consentimiento en cualquier momento: Tiene derecho a no dar o retirar su consentimiento, sin embargo, ello no afectará a la licitud de ningún tratamiento realizado con anterioridad. Si elige no proporcionar o retirar su consentimiento, existe la posibilidad de que no podamos proporcionarle ciertos productos y servicios. Y si ese es el caso, te lo haremos saber.</li>
                </ul>

                <h2 className="px-4 font-medium">¿Cómo protegemos estos datos?</h2>

                <p className="px-4">Nuestras medidas para proteger sus datos contra el acceso, el uso, la alteración, la divulgación o la destrucción no autorizados incluyen la protección física y lógica de los activos, las comunicaciones encriptadas, la gestión del acceso, la adhesión al desarrollo de software seguro y las políticas de cumplimiento interno que insertan la seguridad en el ciclo de vida de Nuestros servicios.</p>

                <p className="px-4">Los requisitos de esta Política complementan, y no reemplazan, cualquier otro requisito existente bajo la ley de protección de datos aplicable, que será la que prevalezca en cualquier caso.</p>

                <p className="px-4">Esta Política está sujeta a revisiones periódicas y el sitio puede modificarla en cualquier momento. Cuando esto ocurra, le avisaremos de cualquier cambio y le pediremos que vuelva a leer la versión más reciente de nuestra Política y que confirme su aceptación.</p>
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