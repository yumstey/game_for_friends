import { Pause, Play, RotateCcw } from 'lucide-react'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { cn, formatDuration, playAlarm, unlockAudio, useCountdown, vibrate } from '@/shared/lib'
import { Button } from './Button'
import { IconButton } from './IconButton'

export interface CountdownTimerProps {
  durationSeconds: number
  className?: string
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Aylana progressli taymer. Tugaganda vibratsiya va ovozli signal beradi. */
export function CountdownTimer({ durationSeconds, className }: CountdownTimerProps) {
  const t = useTranslation(commonMessages)
  const timer = useCountdown(durationSeconds, {
    onFinish: () => {
      vibrate([200, 100, 200, 100, 400])
      playAlarm()
    },
  })

  const isRunning = timer.status === 'running'
  const isFinished = timer.status === 'finished'
  const isUrgent = isRunning && timer.remainingSeconds <= 10

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative size-48">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            className="stroke-muted"
          />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * timer.progress}
            className={cn(
              'transition-[stroke-dashoffset] duration-200 ease-linear',
              isFinished || isUrgent ? 'stroke-rose-500' : 'stroke-primary',
            )}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              'font-display text-4xl font-semibold tabular-nums',
              (isFinished || isUrgent) && 'text-rose-500',
              isUrgent && 'animate-pulse',
            )}
          >
            {formatDuration(timer.remainingSeconds)}
          </span>
          {isFinished && (
            <span className="mt-1 text-sm font-semibold text-rose-500">
              {t.timerFinished}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isRunning ? (
          <Button variant="secondary" icon={<Pause />} onClick={timer.pause}>
            {t.pause}
          </Button>
        ) : (
          <Button
            icon={<Play />}
            onClick={() => {
              unlockAudio()
              timer.start()
            }}
          >
            {timer.status === 'paused' ? t.continue : t.start}
          </Button>
        )}
        <IconButton
          label={t.reset}
          icon={<RotateCcw />}
          variant="outline"
          onClick={timer.reset}
          disabled={timer.status === 'idle'}
        />
      </div>
    </div>
  )
}
