export function buildChatBotPayload(formData: any , requestID:String) {
  const now = new Date();
  const formatDate = (date: Date) => {
    const padZero = (num: number) => (num < 10 ? '0' : '') + num;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${padZero(date.getDate())}-${monthNames[date.getMonth()]}-${date.getFullYear()}-${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
  }
    return {
      RequestHeader: {
        requestID: requestID,
        action: "claimIntimation",
        channel: "SBIG",
        // transactionTimestamp:"20-Jan-2025-16:41:23",
        transactionTimestamp:formatDate(now)
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
  