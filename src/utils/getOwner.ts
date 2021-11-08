
export function getOwner({ kind, ownerSafeId, account }: any) {
    return (kind === 0 && ownerSafeId !== account.safeId) ||
      (kind === 1 && ownerSafeId === account.safeId)
      ? 'buyer'
      : 'seller';
  }
