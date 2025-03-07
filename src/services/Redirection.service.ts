import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RedirectionService {
  private token = new BehaviorSubject<string>("");
  private source = new BehaviorSubject<string>("");
  private clientId = new BehaviorSubject<string>("");
  private agentId = new BehaviorSubject<string>("");
  private policyNo = new BehaviorSubject<string>("");

  setToken(token: string) {
    this.token.next(token);
  }

  getToken() {
    return this.token.asObservable();
  }
  setSource(source: string) {
    this.source.next(source);
  }
  getSource() {
    return this.source.asObservable();
  }
  setclientId(clientId: string) {
    this.clientId.next(clientId);
  }
  getClientId() {
    return this.clientId.asObservable();
  }
  setAgentId(agentId: string) {
    this.agentId.next(agentId);
  }
  getAgentId() {
    return this.agentId.asObservable();
  }
  setPolicyNo(policyNo: string) {
    this.policyNo.next(policyNo);
  }
  getPolicyNo() {
    return this.policyNo.asObservable();
  }
}
