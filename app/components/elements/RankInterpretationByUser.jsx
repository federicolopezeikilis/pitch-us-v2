import { RateYellowImage, ButtonBlue } from '../../components'
import { useRouter } from 'next/router'

export function RankInterpretationByUser({ onRankClick, rankByUser, userLoggedIn }) {
    const router = useRouter()

    const onLoginClick = () => {
        router.push('/login')
    }

    return <>
        {userLoggedIn && <div className="w-full flex justify-between">
            <p className="text-myblack font-medium">Rate this interpretation:</p>
            <div className="flex justify-center items-center">

                {!rankByUser && <>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(1)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(2)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(3)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(4)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(5)
                        }} /></button>
                </>}

                {rankByUser === 1 && <>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(1)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(2)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(3)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(4)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(5)
                        }} /></button>
                </>}

                {rankByUser === 2 && <>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(1)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(2)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(3)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(4)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(5)
                        }} /></button>
                </>}

                {rankByUser === 3 && <>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(1)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(2)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(3)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(4)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(5)
                        }} /></button>
                </>}

                {rankByUser === 4 && <>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(1)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(2)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(3)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(4)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage
                        onClick={function () {
                            onRankClick(5)
                        }} /></button>
                </>}

                {rankByUser === 5 && <>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(1)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(2)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(3)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(4)
                        }} /></button>
                    <button className="w-6 h-6"><RateYellowImage full={true}
                        onClick={function () {
                            onRankClick(5)
                        }} /></button>
                </>}

            </div>
        </div>}
        {!userLoggedIn &&
            <div className="flex justify-center items-center">
                <ButtonBlue className="w-fit" onClick={onLoginClick} >Log in to rate</ButtonBlue>
            </div>
        }
    </>
}