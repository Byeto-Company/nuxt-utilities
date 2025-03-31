import { ref  } from '#imports'

type Props = {
    duration: number;
    callback?: () => void
}

const useTimer = ({ duration, callback }: Props) => {
    const timeout = ref<NodeJS.Timeout | null>(null);
    const interval = ref<NodeJS.Timeout | null>(null);

    const isPending = ref(false);
    const timer = ref(duration / 1000);

    const reset = () => {
        if (timeout.value) clearTimeout(timeout.value);
        if (interval.value) clearInterval(interval.value);

        isPending.value = false;
        timer.value = duration / 1000;
    };

    const start = () => {
        isPending.value = true;

        timeout.value = setTimeout(() => {
            if (interval.value) clearInterval(interval.value);
            if (callback) callback();
            isPending.value = false;
            timer.value = duration / 1000;
        }, duration);

        interval.value = setInterval(() => {
            timer.value -= 1;
        }, 1000);
    };

    return {
        isPending,
        timer,
        reset,
        start
    };
};

export default useTimer;
