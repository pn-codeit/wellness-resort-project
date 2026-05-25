function pickLabels(items, ids) {
  const byId = new Map((items || []).map((item) => [item.id, item]));
  return ids.map((id) => byId.get(id)).filter(Boolean).map((item) => item.label);
}

function labelOf(items, id, fallback) {
  const found = (items || []).find((item) => item.id === id);
  return found ? found.label : fallback;
}

function estimateTotal(context, selection) {
  const booking = context.booking || {};
  const duration = (booking.durations || []).find((item) => item.id === selection.durationId);
  const room = (booking.rooms || []).find((item) => item.id === selection.roomId);
  const treatmentIds = new Set(selection.treatmentIds);
  const extraIds = new Set(selection.extraIds);

  if (!duration) return null;

  const treatmentTotal = (booking.treatments || [])
    .filter((item) => treatmentIds.has(item.id))
    .reduce((sum, item) => sum + Number(item.price || 0), 0);
  const extrasTotal = (booking.extras || [])
    .filter((item) => extraIds.has(item.id))
    .reduce((sum, item) => sum + Number(item.price || 0) + Number(item.pricePerNight || 0) * duration.nights, 0);
  const roomTotal = Number(room ? room.pricePerNight || 0 : 0) * duration.nights;

  return Number((Number(duration.price || 0) + roomTotal + treatmentTotal + extrasTotal).toFixed(2));
}

function buildFallbackAdvice({ input, lang, context }) {
  const lower = input.toLowerCase();
  const stress = /stress|burn|sleep|schlaf|ausgebrannt|ruhe|tired|mued|mude/.test(lower);
  const pain = /back|neck|pain|ruecken|rucken|nacken|verspann/.test(lower);
  const romance = /romant|anniversary|hochzeit|jahrestag|partner/.test(lower);
  const detox = /detox|clean|reinig|energy|energie/.test(lower);

  const selection = romance
    ? { durationId: 'weekend', roomId: 'penthouse', treatmentIds: ['ayurveda', 'sauna'], extraIds: ['flowers', 'wine', 'dinner'] }
    : pain
      ? { durationId: 'midweek', roomId: 'superior', treatmentIds: ['massage', 'fango', 'kneipp'], extraIds: ['breakfast'] }
      : detox
        ? { durationId: 'week', roomId: 'standard', treatmentIds: ['yoga', 'ayurveda', 'kneipp'], extraIds: ['breakfast', 'hiking'] }
        : { durationId: stress ? 'week' : 'midweek', roomId: 'superior', treatmentIds: ['yoga', 'ayurveda', 'sauna'], extraIds: ['breakfast', 'hiking'] };

  const booking = context.booking || {};
  const total = estimateTotal(context, selection);
  const money = total === null
    ? (lang === 'en' ? 'available in the configurator' : 'im Konfigurator verfuegbar')
    : (lang === 'en' ? `approx. ${total.toLocaleString('en-US')} EUR` : `ca. ${total.toLocaleString('de-DE')} EUR`);

  if (lang === 'en') {
    return {
      greeting: romance
        ? 'That sounds like a stay where privacy, rituals and a slower rhythm matter most.'
        : 'Based on your description, I would keep the stay calm, structured and focused on recovery.',
      recommendation: {
        duration: labelOf(booking.durations, selection.durationId, '4 Nights'),
        treatments: pickLabels(booking.treatments, selection.treatmentIds),
        room: labelOf(booking.rooms, selection.roomId, 'Superior Suite'),
        extras: pickLabels(booking.extras, selection.extraIds),
        reasoning: pain
          ? 'Massage, heat and Kneipp therapy address tension directly while leaving enough quiet time between sessions.'
          : romance
            ? 'The private room setting and small arrival extras make the stay feel personal without making the schedule too full.'
            : 'Yoga, Ayurveda and sauna rituals support sleep, stress relief and a more grounded daily rhythm.',
        total_price: money
      },
      source: 'fallback'
    };
  }

  return {
    greeting: romance
      ? 'Das klingt nach einem Aufenthalt, bei dem Privatsphaere, Rituale und ein ruhiger Rhythmus wichtig sind.'
      : 'Nach Ihrer Beschreibung wuerde ich den Aufenthalt ruhig, klar strukturiert und erholungsorientiert planen.',
    recommendation: {
      duration: labelOf(booking.durations, selection.durationId, '4 Naechte'),
      treatments: pickLabels(booking.treatments, selection.treatmentIds),
      room: labelOf(booking.rooms, selection.roomId, 'Superior Suite'),
      extras: pickLabels(booking.extras, selection.extraIds),
      reasoning: pain
        ? 'Massage, Waerme und Kneipp-Anwendungen sprechen Verspannungen gezielt an und lassen trotzdem genug Ruhe zwischen den Terminen.'
        : romance
          ? 'Das private Zimmer und kleine Extras zur Anreise machen den Aufenthalt persoenlich, ohne den Zeitplan zu ueberladen.'
          : 'Yoga, Ayurveda und Sauna-Rituale unterstuetzen Schlaf, Stressabbau und einen ruhigeren Tagesrhythmus.',
      total_price: money
    },
    source: 'fallback'
  };
}

module.exports = {
  buildFallbackAdvice
};
