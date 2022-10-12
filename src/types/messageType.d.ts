export interface IMessage {
  kind: string
  message: string
  [warningMessageOkButtonHandle: string | undefined]: MouseEventHandler<HTMLButtonElement> | undefined
}
