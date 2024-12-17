import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Tenant } from '../../types/tenant';

const DEFAULT_TENANT_SETTINGS: Tenant['settings'] = {
  previewPosition: 'bottom-right',
  autoPlayPreview: true,
  previewDuration: 5,
  whatsappNumber: '',
  whatsappMessage: '',
  companyInfo: {
    name: '',
    logo: ''
  },
  gtmSettings: {
    enabled: false,
    containerId: ''
  }
};

export async function createTenant(userId: string, name: string): Promise<Tenant> {
  const tenantRef = doc(collection(db, 'tenants'));
  
  const tenant: Tenant = {
    id: tenantRef.id,
    name,
    createdAt: Date.now(),
    ownerId: userId,
    settings: DEFAULT_TENANT_SETTINGS
  };

  await setDoc(tenantRef, tenant);
  return tenant;
}

export async function getTenantByUser(userId: string): Promise<Tenant | null> {
  // First check if user is an owner
  const ownerQuery = query(
    collection(db, 'tenants'),
    where('ownerId', '==', userId)
  );
  
  const ownerSnapshot = await getDocs(ownerQuery);
  if (!ownerSnapshot.empty) {
    return ownerSnapshot.docs[0].data() as Tenant;
  }

  // Then check if user belongs to any tenant
  const userTenantsQuery = query(
    collection(db, 'tenant_users'),
    where('userId', '==', userId)
  );
  
  const userTenantsSnapshot = await getDocs(userTenantsQuery);
  if (!userTenantsSnapshot.empty) {
    const tenantId = userTenantsSnapshot.docs[0].data().tenantId;
    const tenantDoc = await getDoc(doc(db, 'tenants', tenantId));
    return tenantDoc.exists() ? tenantDoc.data() as Tenant : null;
  }

  return null;
}

export async function updateTenant(
  tenantId: string,
  updates: Partial<Omit<Tenant, 'id'>>
): Promise<Tenant> {
  const tenantRef = doc(db, 'tenants', tenantId);
  await updateDoc(tenantRef, updates);
  
  const updatedDoc = await getDoc(tenantRef);
  return updatedDoc.data() as Tenant;
}