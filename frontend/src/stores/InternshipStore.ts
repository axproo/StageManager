import { defineStore } from "pinia";

export interface InternshipRequest {
  id: number;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  university: string;
  speciality: string;
  department: string;

  startDate: string;
  endDate: string;

  message: string;

  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const useInternshipStore = defineStore("internship", {
  state: () => ({
    requests: JSON.parse(
      localStorage.getItem("internshipRequests") || "[]",
    ) as InternshipRequest[],
  }),

  /*
  |--------------------------------------------------------------------------
  | GETTERS
  |--------------------------------------------------------------------------
  */

  getters: {
    /**
     * Toutes les demandes en attente.
     * Elles apparaissent dans la page "Demandes"
     * et dans les notifications admin.
     */
    pendingRequests(state) {
      return state.requests.filter(
        (request) => request.status === "PENDING",
      );
    },

    /**
     * Demandes acceptées.
     */
    acceptedRequests(state) {
      return state.requests.filter(
        (request) => request.status === "APPROVED",
      );
    },

    /**
     * Demandes refusées.
     */
    rejectedRequests(state) {
      return state.requests.filter(
        (request) => request.status === "REJECTED",
      );
    },

    /**
     * Nombre de notifications non traitées.
     *
     * Une demande PENDING = une notification.
     */
    pendingCount(state) {
      return state.requests.filter(
        (request) => request.status === "PENDING",
      ).length;
    },

    /**
     * Notifications admin.
     *
     * On utilise directement les demandes PENDING.
     * Il n'y a donc pas de duplication des données.
     */
    notifications(state) {
      return state.requests
        .filter((request) => request.status === "PENDING")
        .map((request) => ({
          id: request.id,
          requestId: request.id,

          title: "Nouvelle demande de stage",

          message: `${request.firstName} ${request.lastName}`,

          university: request.university,

          speciality: request.speciality,

          department: request.department,

          startDate: request.startDate,

          endDate: request.endDate,

          email: request.email,

          phone: request.phone,

          createdAt: "Nouvelle demande",
        }));
    },
  },

  /*
  |--------------------------------------------------------------------------
  | ACTIONS
  |--------------------------------------------------------------------------
  */

  actions: {
    /**
     * Ajouter une nouvelle demande.
     *
     * La demande est automatiquement PENDING.
     */
    addRequest(request: InternshipRequest) {
      this.requests.push({
        ...request,
        status: "PENDING",
      });

      this.saveRequests();
    },

    /**
     * Accepter une demande.
     *
     * Elle quitte automatiquement les demandes en attente
     * et apparaît dans les demandes acceptées.
     */
    approveRequest(id: number) {
      const request = this.requests.find(
        (item) => item.id === id,
      );

      if (!request) {
        return;
      }

      request.status = "APPROVED";

      this.saveRequests();
    },

    /**
     * Refuser une demande.
     *
     * Elle quitte automatiquement les demandes en attente
     * et apparaît dans les demandes refusées.
     */
    rejectRequest(id: number) {
      const request = this.requests.find(
        (item) => item.id === id,
      );

      if (!request) {
        return;
      }

      request.status = "REJECTED";

      this.saveRequests();
    },

    /**
     * Charger les demandes depuis localStorage.
     */
    loadRequests() {
      this.requests = JSON.parse(
        localStorage.getItem("internshipRequests") || "[]",
      ) as InternshipRequest[];
    },

    /**
     * Sauvegarder les demandes dans localStorage.
     */
    saveRequests() {
      localStorage.setItem(
        "internshipRequests",
        JSON.stringify(this.requests),
      );
    },
  },
});