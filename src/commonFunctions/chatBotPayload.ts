export function buildChatBotPayload(formData: any) {
    return {
      RequestHeader: {
        requestID: "123458",
        action: "claimIntimation",
        channel: "SBIG",
        transactionTimestamp:"20-Jan-2025-16:41:23",
      },
      RequestBody: {
        Claims: {
          ServiceType: "Intimation",
          TieUpClaimId: null,
          InsuranceCompany: "UATAICI",
          Claim: {
            PolicyNumber: formData.policyNumber,
            RegistrationNumber: formData.registrationNumber,
            ContactName: formData.customerName,
            ClaimServicingbranch: formData.claimServicingBranch,
            ContactNumber: formData.customerMobileNumber,
            emailID: formData.customerEmailId,
            AccidentDateandtime: formData.AccidentDateTime,
            AccidentCity: formData.LossCity,
            VehicleInspectionAddress: formData.workshopName,
            CityName: formData.LossCity,
            StateName: formData.LossState,
            InspectionSpotLocation: formData.SurveyPlaceOrGarageNameAddress,
            Garage: formData.workshopName,
            DriverName: formData.DriverName,
            isInsured: formData.isInsured,
            ClaimIntimatedBy: "Insured",
            CauseOfLoss: formData.LossDescription,
            Others: formData.remarks,
            EstimatedClaimAmount: formData.EstimatedClaimAmount,
          },
        },
      },
    };
  }
  