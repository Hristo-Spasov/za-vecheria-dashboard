import { reactive } from 'vue'
export const user = reactive({
    name: 'Иван',
    familyName: 'Иванов',
    nickname: 'TestUser',
    avatar: null as string | null,
    initials: 'ИП',
    role: 'Администратор',
    email: 'test@example.com',
    phone: '0876543210',
    address: 'София, ул. Пример 123',
    city: 'София',
    country: 'България',
    postalCode: '1000',
    createdAt: new Date(),
    updatedAt: new Date(),
    })