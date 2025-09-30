export default function FeatureBadge({ plan }) {
  const color = plan === 'premium' ? '#0070f3' : plan === 'pro' ? '#00cc66' : '#999';
  return (
    <span style={{
      background: color,
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.8rem'
    }}>
      {plan.toUpperCase()}
    </span>
  );
}
