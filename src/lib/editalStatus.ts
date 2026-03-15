/**
 * Retorna o status efetivo do edital para exibição.
 * Quando data_encerramento já foi ultrapassada e o status no dado é "aberto",
 * retorna "fechando".
 */
export function getEffectiveStatus(data: {
  status: string;
  data_encerramento?: string;
}): string {
  if (data.status !== "aberto") return data.status;
  const encerramento = data.data_encerramento?.trim();
  if (!encerramento) return data.status;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataFim = new Date(encerramento);
  dataFim.setHours(0, 0, 0, 0);
  return dataFim < hoje ? "fechando" : data.status;
}
