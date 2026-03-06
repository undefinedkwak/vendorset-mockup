// Vendors
export const vendors = [
  { id: "V001", name: "대한물류", businessNumber: "123-45-67890", representative: "김대한", displayName: "대한물류", status: "ACTIVE" as const, partnerName: "강남B지점", vendorCode: "VC-2026-001", invitationCode: "INV-A1B2C3", createdAt: "2026-01-15" },
  { id: "V002", name: "신속배송", businessNumber: "234-56-78901", representative: "이신속", displayName: "신속배송", status: "ACTIVE" as const, partnerName: "서초B지점", vendorCode: "VC-2026-002", invitationCode: "INV-D4E5F6", createdAt: "2026-01-20" },
  { id: "V003", name: "빠른달", businessNumber: "345-67-89012", representative: "박빠른", displayName: "빠른달", status: "STANDBY" as const, partnerName: null, vendorCode: "VC-2026-003", invitationCode: null, createdAt: "2026-02-01" },
  { id: "V004", name: "우리택배", businessNumber: "456-78-90123", representative: "최우리", displayName: "우리택배", status: "TERMINATED" as const, partnerName: null, vendorCode: "VC-2026-004", invitationCode: "INV-G7H8I9", createdAt: "2025-11-10" },
  { id: "V005", name: "한빛운송", businessNumber: "567-89-01234", representative: "정한빛", displayName: "한빛운송", status: "ACTIVE" as const, partnerName: "송파B지점", vendorCode: "VC-2026-005", invitationCode: "INV-J0K1L2", createdAt: "2026-02-15" },
];
export type VendorStatus = "STANDBY" | "ACTIVE" | "TERMINATED" | "DELETED";

export const partners = [
  { id: "P001", name: "강남B지점", type: "B_TYPE", regionName: "강남구" },
  { id: "P002", name: "서초B지점", type: "B_TYPE", regionName: "서초구" },
  { id: "P003", name: "송파B지점", type: "B_TYPE", regionName: "송파구" },
  { id: "P004", name: "마포B지점", type: "B_TYPE", regionName: "마포구" },
  { id: "P005", name: "영등포B지점", type: "B_TYPE", regionName: "영등포구" },
];

export const setAllocations = [
  { id: "SA001", partnerId: "P001", partnerName: "강남B지점", weekStartDate: "2026-03-02", totalSets: 10, vendors: [
    { vendorId: "V001", vendorName: "대한물류", allocatedSets: 6 },
    { vendorId: "V005", vendorName: "한빛운송", allocatedSets: 4 },
  ]},
  { id: "SA002", partnerId: "P002", partnerName: "서초B지점", weekStartDate: "2026-03-02", totalSets: 8, vendors: [
    { vendorId: "V002", vendorName: "신속배송", allocatedSets: 8 },
  ]},
  { id: "SA003", partnerId: "P003", partnerName: "송파B지점", weekStartDate: "2026-03-02", totalSets: 5, vendors: [
    { vendorId: "V005", vendorName: "한빛운송", allocatedSets: 5 },
  ]},
];

export const monthlyTargets = [
  { partnerId: "P001", partnerName: "강남B지점", month: "2026-03", targetSets: 42, achievedSets: 28, rate: 66.7 },
  { partnerId: "P002", partnerName: "서초B지점", month: "2026-03", targetSets: 35, achievedSets: 24, rate: 68.6 },
  { partnerId: "P003", partnerName: "송파B지점", month: "2026-03", targetSets: 20, achievedSets: 10, rate: 50.0 },
];

export const policies = [
  { id: "SOP001", name: "강남 기본 정책", description: "강남구 B-type 기본 운영 정책", status: "ACTIVE" as const, linkedZones: ["강남B지점", "서초B지점"], versionsCount: 3 },
  { id: "SOP002", name: "송파 기본 정책", description: "송파구 B-type 기본 운영 정책", status: "ACTIVE" as const, linkedZones: ["송파B지점"], versionsCount: 2 },
  { id: "SOP003", name: "마포 시범 정책", description: "마포구 B-type 시범 운영 정책", status: "INACTIVE" as const, linkedZones: [], versionsCount: 1 },
];

export const policyVersions = [
  { id: "PV001", policyId: "SOP001", version: 3, status: "ACTIVE" as "DRAFT" | "SCHEDULED" | "ACTIVE" | "SUPERSEDED" | "ARCHIVED", feePerFiftyMeters: 120, pickupFee: 1500, deliveryCompleteFee: 3000, minGoalSlots: 25, acceptanceRatePercent: 80, amountPerSet: 50000, effectiveFrom: "2026-03-02" },
  { id: "PV002", policyId: "SOP001", version: 2, status: "SUPERSEDED" as "DRAFT" | "SCHEDULED" | "ACTIVE" | "SUPERSEDED" | "ARCHIVED", feePerFiftyMeters: 100, pickupFee: 1500, deliveryCompleteFee: 2800, minGoalSlots: 20, acceptanceRatePercent: 75, amountPerSet: 45000, effectiveFrom: "2026-02-03" },
  { id: "PV003", policyId: "SOP001", version: 4, status: "DRAFT" as "DRAFT" | "SCHEDULED" | "ACTIVE" | "SUPERSEDED" | "ARCHIVED", feePerFiftyMeters: 130, pickupFee: 1600, deliveryCompleteFee: 3200, minGoalSlots: 28, acceptanceRatePercent: 85, amountPerSet: 55000, effectiveFrom: null },
];
export type PolicyVersionStatus = "DRAFT" | "SCHEDULED" | "ACTIVE" | "SUPERSEDED" | "ARCHIVED";

export const slotLabels = ["08-10", "10-13", "13-16", "16-19", "19-22"];
export const dayLabels = ["월", "화", "수", "목", "금", "토", "일"];

export const volumeMatrix: number[][] = [
  [3, 5, 8, 6, 4], [3, 5, 7, 6, 4], [2, 4, 7, 5, 3],
  [3, 5, 8, 6, 4], [4, 6, 9, 7, 5], [5, 7, 10, 8, 6], [4, 6, 8, 7, 5],
];

export const performanceMatrix: number[][] = [
  [3, 5, 7, 6, 4], [3, 4, 7, 5, 4], [2, 3, 5, 4, 3],
  [2, 4, 6, 5, 3], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
];

export const vendorAgents = [
  { id: "A001", name: "홍길동", phone: "010-1234-5678", status: "ACTIVE" as const, isActive: true, currentMode: "DP-S" as const, isFriendsOnly: false, joinedAt: "2026-01-20" },
  { id: "A002", name: "김철수", phone: "010-2345-6789", status: "ACTIVE" as const, isActive: true, currentMode: "DP-S" as const, isFriendsOnly: false, joinedAt: "2026-01-22" },
  { id: "A003", name: "이영희", phone: "010-3456-7890", status: "ACTIVE" as const, isActive: false, currentMode: "DP-F" as const, isFriendsOnly: true, joinedAt: "2026-02-01" },
  { id: "A004", name: "박지수", phone: "010-4567-8901", status: "ACTIVE" as const, isActive: true, currentMode: "DP-S" as const, isFriendsOnly: false, joinedAt: "2026-02-05" },
  { id: "A005", name: "최민수", phone: "010-5678-9012", status: "PENDING" as const, isActive: false, currentMode: null, isFriendsOnly: false, joinedAt: "2026-03-05" },
  { id: "A006", name: "강하나", phone: "010-6789-0123", status: "PENDING" as const, isActive: false, currentMode: null, isFriendsOnly: false, joinedAt: "2026-03-06" },
  { id: "A007", name: "윤서연", phone: "010-7890-1234", status: "INACTIVE" as const, isActive: false, currentMode: null, isFriendsOnly: false, joinedAt: "2026-01-10" },
];
export type AgentStatus = "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE";
export type DispatchMode = "DP-S" | "DP-F" | "DP-FA" | null;

export const volumeRequests = [
  { id: "VR001", vendorId: "V001", vendorName: "대한물류", status: "PENDING" as const, requestedAt: "2026-03-04", reviewedAt: null, reviewer: null, reason: null,
    currentMatrix: volumeMatrix,
    requestedMatrix: [[4,6,9,7,5],[4,6,8,7,5],[3,5,8,6,4],[4,6,9,7,5],[5,7,10,8,6],[6,8,11,9,7],[5,7,9,8,6]],
  },
  { id: "VR002", vendorId: "V002", vendorName: "신속배송", status: "APPROVED" as const, requestedAt: "2026-02-25", reviewedAt: "2026-02-27", reviewer: "RM김관리", reason: null, currentMatrix: volumeMatrix, requestedMatrix: volumeMatrix },
  { id: "VR003", vendorId: "V001", vendorName: "대한물류", status: "REJECTED" as const, requestedAt: "2026-02-20", reviewedAt: "2026-02-22", reviewer: "RM김관리", reason: "현재 인력 기준 과다 요청", currentMatrix: volumeMatrix,
    requestedMatrix: [[5,8,12,9,7],[5,8,12,9,7],[5,8,12,9,7],[5,8,12,9,7],[5,8,12,9,7],[5,8,12,9,7],[5,8,12,9,7]],
  },
];
export type VolumeRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export const settlements = [
  { id: "WS001", vendorId: "V001", vendorName: "대한물류", weekStartDate: "2026-02-24", status: "CONFIRMED" as const, totalDeliveries: 245, deliveryFeeTotal: 735000, incentiveTotal: 300000, grandTotal: 1035000, acceptanceRate: 92.5, paidAt: "2026-03-03" },
  { id: "WS002", vendorId: "V002", vendorName: "신속배송", weekStartDate: "2026-02-24", status: "CONFIRMED" as const, totalDeliveries: 198, deliveryFeeTotal: 594000, incentiveTotal: 250000, grandTotal: 844000, acceptanceRate: 88.2, paidAt: "2026-03-03" },
  { id: "WS003", vendorId: "V001", vendorName: "대한물류", weekStartDate: "2026-03-02", status: "PENDING" as const, totalDeliveries: 180, deliveryFeeTotal: 540000, incentiveTotal: 0, grandTotal: 540000, acceptanceRate: 85.0, paidAt: null },
  { id: "WS004", vendorId: "V002", vendorName: "신속배송", weekStartDate: "2026-03-02", status: "PENDING" as const, totalDeliveries: 150, deliveryFeeTotal: 450000, incentiveTotal: 0, grandTotal: 450000, acceptanceRate: 82.1, paidAt: null },
  { id: "WS005", vendorId: "V005", vendorName: "한빛운송", weekStartDate: "2026-03-02", status: "PENDING" as const, totalDeliveries: 95, deliveryFeeTotal: 285000, incentiveTotal: 0, grandTotal: 285000, acceptanceRate: 78.5, paidAt: null },
];
export type SettlementStatus = "PENDING" | "CONFIRMED";

export const agentPerformances = [
  { agentId: "A001", agentName: "홍길동", completedCount: 68, dispatchedCount: 72, completionRate: 94.4, acceptanceRate: 95.2 },
  { agentId: "A002", agentName: "김철수", completedCount: 55, dispatchedCount: 60, completionRate: 91.7, acceptanceRate: 88.5 },
  { agentId: "A003", agentName: "이영희", completedCount: 30, dispatchedCount: 32, completionRate: 93.8, acceptanceRate: 90.1 },
  { agentId: "A004", agentName: "박지수", completedCount: 47, dispatchedCount: 52, completionRate: 90.4, acceptanceRate: 86.7 },
];

export const dispatchOffers = [
  { id: "DO001", orderNumber: "ORD-2026-03-06-0142", pickupAddress: "강남구 역삼동 123-4", deliveryAddress: "강남구 삼성동 456-7", distanceMeters: 2300, estimatedFee: 4500, timeoutSec: 30 },
];

export const mcashHistory = [
  { id: "MC001", orderNumber: "ORD-2026-03-05-0098", completedAt: "2026-03-05 14:23", amount: 4200, dispatchSource: "SET" as const },
  { id: "MC002", orderNumber: "ORD-2026-03-05-0105", completedAt: "2026-03-05 15:10", amount: 3800, dispatchSource: "SET" as const },
  { id: "MC003", orderNumber: "ORD-2026-03-04-0087", completedAt: "2026-03-04 11:45", amount: 5100, dispatchSource: "FRIENDS" as const },
  { id: "MC004", orderNumber: "ORD-2026-03-04-0092", completedAt: "2026-03-04 13:20", amount: 4500, dispatchSource: "SET" as const },
  { id: "MC005", orderNumber: "ORD-2026-03-03-0076", completedAt: "2026-03-03 16:55", amount: 3600, dispatchSource: "FRIENDS" as const },
];
export type DispatchSource = "SET" | "FRIENDS";

export const weeklyPlanStatus = {
  currentWeek: "2026-03-02",
  nextWeek: "2026-03-09",
  carryOverExecuted: false,
  carryOverWindow: { start: "금요일", end: "일요일" },
};
