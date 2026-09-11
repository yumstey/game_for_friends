import { ArrowLeft, ArrowRight, Check, Sunrise } from 'lucide-react'
import {
  MAFIA_ROLES,
  RoleBadge,
  getCheckResult,
  getNightSteps,
  getStepActors,
  getStepAvailability,
  getTargetRestriction,
  useMafiaStore,
  type MafiaSession,
  type NightStepId,
} from '@/entities/mafia'
import { useTranslation } from '@/shared/i18n'
import { cn, vibrate } from '@/shared/lib'
import { Avatar, BottomBar, Button, Callout, ChoiceCard } from '@/shared/ui'
import { nightMessages } from './messages'

// Har bir tungi qadam nomi rol nomi bilan bir xil, `mafia` esa butun jamoani bildiradi.
const stepEmoji = (step: NightStepId) => MAFIA_ROLES[step].emoji

/** Boshlovchi uchun tungi qadamlar ustasi: kim uygʻonadi, nima tanlaydi, natija qanday. */
export function NightWizard({ session }: { session: MafiaSession }) {
  const t = useTranslation(nightMessages)
  const { selectNightTarget, goToNightStep, completeNight } = useMafiaStore.getState()

  const steps = getNightSteps(session.players)
  const stepIndex = Math.min(session.nightStep, steps.length - 1)
  const step = steps[stepIndex]

  if (!step) return null

  const availability = getStepAvailability(session, step)
  const isActive = availability === 'active'
  const actors = getStepActors(session.players, step)
  const targetId = session.night[step]
  const isLast = stepIndex === steps.length - 1
  const blockedName = session.players.find((player) => player.id === session.night.lover)?.name
  const checkResult =
    isActive && (step === 'detective' || step === 'don')
      ? getCheckResult(session.players, step, targetId)
      : null

  const goNext = () => {
    vibrate(15)
    if (isLast) completeNight()
    else goToNightStep(stepIndex + 1)
  }

  return (
    <>
      {/* Qadamlar indikatori */}
      <ol className="flex items-center justify-center gap-1.5">
        {steps.map((item, index) => (
          <li key={item}>
            <button
              type="button"
              aria-label={t.steps[item].title}
              aria-current={index === stepIndex ? 'step' : undefined}
              onClick={() => goToNightStep(index)}
              className={cn(
                'relative flex size-10 items-center justify-center rounded-2xl text-lg transition',
                index === stepIndex
                  ? 'scale-110 bg-indigo-500 shadow-lg shadow-indigo-500/40'
                  : 'bg-muted opacity-60',
              )}
            >
              <span aria-hidden>{stepEmoji(item)}</span>
              {index < stepIndex && (
                <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-2.5" strokeWidth={4} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>

      {/* Qadam kartasi */}
      <section
        key={step}
        className="relative animate-fade-up overflow-hidden rounded-4xl bg-linear-to-br from-indigo-950 via-slate-900 to-zinc-950 p-5 text-white shadow-xl shadow-indigo-950/30"
      >
        <div className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <span className="animate-float text-5xl" aria-hidden>
            {stepEmoji(step)}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-semibold">{t.steps[step].title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-indigo-100/80 italic">
              «{t.steps[step].script}»
            </p>
          </div>
        </div>

        {actors.length > 0 && (
          <div className="relative mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-indigo-200/70 uppercase">
              {t.awake}:
            </span>
            {actors.map((actor) => (
              <span
                key={actor.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1 pr-2.5 pl-1 text-sm font-semibold"
              >
                <Avatar name={actor.name} size="xs" />
                {actor.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {availability === 'dead' && <Callout tone="info">{t.dead}</Callout>}
      {availability === 'blocked' && blockedName && (
        <Callout tone="warning">{t.blocked(blockedName)}</Callout>
      )}

      {isActive && (
        <div className="flex flex-col gap-3">
          <h3 className="px-1 font-display text-sm font-semibold">{t.chooseTarget}</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {session.players
              .filter((player) => player.alive)
              .map((player) => {
                const restriction = getTargetRestriction(session, step, player)

                return (
                  <ChoiceCard
                    key={player.id}
                    tone={step === 'doctor' ? 'primary' : 'danger'}
                    selected={targetId === player.id}
                    disabled={restriction !== null}
                    onClick={() => {
                      vibrate(10)
                      selectNightTarget(step, targetId === player.id ? null : player.id)
                    }}
                    className="flex-col items-start gap-1.5"
                  >
                    <span className="flex w-full min-w-0 items-center gap-2">
                      <Avatar name={player.name} size="xs" />
                      <span className="truncate text-sm font-semibold">{player.name}</span>
                    </span>
                    {restriction ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        {t.restrictions[restriction]}
                      </span>
                    ) : (
                      <RoleBadge role={player.role} className="text-[11px]" />
                    )}
                  </ChoiceCard>
                )
              })}
          </div>
        </div>
      )}

      {checkResult !== null && (
        <div
          className={cn(
            'animate-pop-in rounded-3xl p-4 text-center',
            checkResult ? 'bg-rose-500/12 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
          )}
        >
          <p className="font-display text-lg font-semibold">
            {step === 'detective' ? t.detectiveResult(checkResult) : t.donResult(checkResult)}
          </p>
          <p className="mt-1 text-sm opacity-80">{t.showGesture}</p>
        </div>
      )}

      <BottomBar className="flex-row">
        <Button
          size="lg"
          variant="secondary"
          className="w-14 px-0"
          icon={<ArrowLeft />}
          aria-label={t.back}
          disabled={stepIndex === 0}
          onClick={() => goToNightStep(stepIndex - 1)}
        />
        <Button
          size="lg"
          className="flex-1"
          variant={isLast ? 'mafia' : 'primary'}
          iconRight={isLast ? <Sunrise /> : <ArrowRight />}
          onClick={goNext}
        >
          {isLast ? t.finish : isActive && !targetId ? t.skip : t.next}
        </Button>
      </BottomBar>
    </>
  )
}
