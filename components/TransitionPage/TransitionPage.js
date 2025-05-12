'use client'
import { AnimatePresence, motion  } from "framer-motion"

export function TransitionPage() {
    return (
        <AnimatePresence mode="">
            <div>
                <motion.div
                    className="fixed top-0 bottom-0 right-full w-screen h-screen z-[1000] bg-main-100"
                    variants={transitionVariantsPage}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    transition={{ delay: 0.2 , duration: 0.6, ease : 'easeInOut'}}
                >

                </motion.div>
                <motion.div
                    className="fixed top-0 bottom-0 right-full w-screen h-screen z-[999] bg-main-100/70 opacity-59"
                    variants={transitionVariantsPage}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    transition={{ delay: 0.4 , duration: 0.6, ease : 'easeInOut'}}
                >

                </motion.div>
            </div>
        </AnimatePresence>
    )
}

const transitionVariantsPage = {
    initial: {
        x: '100%',
        width : '100%'
    },
    animate: {
        x:'0%',
        width: '0%'
    },
    exit: {
        x: ['0%' , '100%'],
        width : ['0%', '100%']
    }
}